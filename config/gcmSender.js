const gcm = require('node-gcm');
const Users = require('../models/user');

class gcmSender {
    constructor() {
        this.sender = new gcm.Sender(process.env.GOOGLE_SERVER_KEY);
    }

  sendMsgNotification(senderid, recieverid, msg) {
    User.findOne({_id: recieverid}, (err, doc) => {
      let message = new gcm.Message({
        data: {
          from: senderid
        },
        notification: {
          title: "you have a new message from someone",
          icon: "ic_launcher",
          body: msg
        }
      });

      this.sender.send(message, {registrationToken: doc.gcmToken}, (err, response) => {
        if(err) console.log(err);
        else    console.log(response);
      });
    });
  }

  sendMsgNotification(senderid, recieverid, msg) {
    User.findOne({_id: recieverid}, (err, doc) => {
      let message = new gcm.Message({
        data: {
          from: senderid
        },
        notification: {
          title: "you have a new message from someone",
          icon: "ic_launcher",
          body: msg
        }
      });

      this.sender.send(message, {registrationToken: doc.gcmToken}, (err, response) => {
        if(err) console.log(err);
        else    console.log(response);
      });
    });
  }

  sendTestMessage(regTokens){
    let message = new gcm.Message({
      data: {key1: "Hello world!"},

    });

        this.sender.send(message, {
            registrationTokens: regTokens
        }, (err, response) => {
            if (err) console.error(err);
            else console.log(response);
        });
    }
}

module.exports = new gcmSender();
