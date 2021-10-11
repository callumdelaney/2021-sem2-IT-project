const crypto = require('crypto')
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");

function checkPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    if (hash == hashVerify) {
        return true
    } else {
        return false
    }
}
function genPassword(password) {
	if(!password) throw new Error("invalid password")
	
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: hash
    };
}

passport.use('local', new LocalStrategy(
    function(username, password, cb) {
        User.findOne({ username: username })
            .then((user) => {
                if (!user) { return cb(null, false) }
                
                // Function defined at bottom of app.js
                const isValid = checkPassword(password, user.hash, user.salt);
                
                if (isValid) {
                    return cb(null, user);
                } else {
                    return cb(null, false);
                }
            })
            .catch((err) => {   
                cb(err);
            });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

module.exports = {
    checkPassword,
    genPassword
}

