// load things we need
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// schema definition
let userSchema = mongoose.Schema({
  username: String,
  email: String,
  local: {
    email: String,
    password: String,
    age: Number
  },
  facebook: {
    id: String,
    token: String
  },
  google: {
    id: String,
    token: String
  },
  soundcloud: {
    id: String,
    token: String
  },
  instruments: [String],
  genres: [String],
  hasFinishedSetup: {type: Boolean, default: false},
  location: {
    lat:   Number,
    lon:   Number,
    valid: false
  },
  liked: [String],
  matched: [String],
  image:{url:String, public_id:String}
});

// methoods
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
