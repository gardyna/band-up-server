const GoogleStrategy = require('passport-google-id-token');

// load up user model
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID
    }, (parsedToken, googleId, done) => {
        // asynchronous
        process.nextTick(() => {
            // look for pre-existing account
            User.findOne({
                'google.id': googleId
            }, (err, user) => {
                if (err) return done(err);

                // if user is found log them in
                if (user) {
                    return done(null, user);
                } else {
                	console.log(parsedToken);
                    let newUser = new User();
                    // googleId is to authenticate a user to google.
                    newUser.google.id = googleId;
                    // parsedToken has all the information about the user.
                    newUser.username = parsedToken.payload.name;
                    newUser.email = parsedToken.payload.email;
                    newUser.image.url = parsedToken.payload.picture;
                    newUser.image.public_id = null;

                    newUser.save((err) => {
                        if (err) throw err;

                        // if succesful return the new user
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
