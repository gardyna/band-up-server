const SoundCloudStrategy = require('passport-soundcloud-token');

// load up user model
const User = require('../models/user');

module.exports = function(passport){
  passport.use(new SoundCloudStrategy({
    clientID    : process.env.SOUNDCLOUD_CLIENT,
    clientSecret: process.env.SOUNDCLOUD_SECRET,
    passReqToCallback: false
  }, (token, refreshToken, profile, done) => {
    // asynchronous
    process.nextTick(() => {
      console.log(profile);
      // look for pre-existing account
      User.findOne({'soundcloud.id': profile.id}, (err, user) => {
        if(err) return done(err);

        // if user is found log them in
        if(user){
           return done(null, user);
         }else{
           // no user found with soundcloud id, time to create one
           let newUser = new User();
           newUser.soundcloud.id = profile.id;
           newUser.soundcloud.token = token;
           newUser.username = profile.name.givenName;
           newUser.email = profile.emails[0].value; // soundcloud returns multiple emails

           newUser.save((err) => {
             if(err) throw err;

             // if succesful return the new user
             return done(null, newUser);
           });
         }
      });
    });
  }));
};
