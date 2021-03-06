const nodemailer = require("nodemailer");


class Mailer{

    constructor(){

    }

    /**
     * reset connection to google to elimate lost connections
     */
    startTransporter(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD
            }
        });
    }

    sendPaswordReset(user){
        this.startTransporter();
        let url = "http://band-up-server.herokuapp.com/reset-password/" + user.resetToken;
        let mailOptions = {
            from: "Bad Melody <support@badmelody.com>",
            to: user.email,
            subject: "Password Reset",
            text: "Please go to the following address to reset your password: " + url,
            html: '<p>Please click <a href="' + url + '">this</a> to reset your password</p>'
        };

        this.transporter.sendMail(mailOptions, (err, info) =>{
            if (err) {
                console.log(err);
                return;
            }
            console.log("password reset message sent");
        });
    }

    sendValidationEmail(user){
        this.startTransporter();
        let url = "http://band-up-server.herokuapp.com/validate/" + user.validToken;
        let mailOptions = {
            from: "Bad Melody <support@badmelody.com>",
            to: user.email,
            subject: "Validate Band Up account",
            text: "Please go to this address to validate your account: " + url,
            html: '<p>Please click <a href="' + url + '">this</a> to validate your account</p>'
        };

        this.transporter.sendMail(mailOptions, (err, info) =>{
            if(err) {
                console.log(err);
                return;
            }

            console.log("password reset message sent");
        });
    }
}

module.exports = new Mailer();
