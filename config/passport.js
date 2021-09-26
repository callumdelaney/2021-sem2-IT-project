//below files are from the passport.js in 2021 Semester 1 INFO30005_2021_SM1 Lecture
// demonstration files, Foodbuddy-testing-w10. most of the comments also originate from those
// files as they are well explained too.

require('dotenv').config()    // for JWT password key. Not sure if we have a .env file yet.

var session = require("express-session");

// our user model
const { User } = require('../models/user');


// "local strategy" for authenticating
//  username and password
// for signing up and logging in
const LocalStrategy = require('passport-local').Strategy;

//  passport-jwt JSON Web Tokens, for authenticating when you're already logged in
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;


module.exports = function(passport) {

    //http://www.passportjs.org/docs/configure/
    //Go to view in the top menu, or press Alt + Z to see wordwrap
    /*
    "In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

In this example, only the user ID is serialized to the session, keeping the amount of data stored within the session small. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.

The serialization and deserialization logic is supplied by the application, allowing the application to choose an appropriate database and/or object mapper, without imposition by the authentication layer.
*/


    // these two functions are used by passport to store information
    // in and retrieve data from sessions. We are using user's object id

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });


    //below is a blatant copy-paste from the source indicated at the start of the file
    // We will probably have to test if it works, and adapt it if it doesn't.
    // Alternatively, you might want to use the simpler version of logging in
    // from the passport documentation itself
    // http://www.passportjs.org/docs/configure/

    // strategy to login
    // this method only takes in username and password, and the field names
    // should match of those in the login form
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username', 
        passwordField : 'password',
        passReqToCallback : true}, // pass the req as the first arg to the callback for verification 
    function(req, username, password, done) {
        console.log("passport login strategy being used", email, password)
        // you can read more about the nextTick() function here: 
        // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
        // we are using it because without it the User.findOne does not work,
        // so it's part of the 'syntax'
        process.nextTick(function() {
            // see if the user with the email exists
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are errors, user is not found or password
                // does match, send back errors
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, {message: 'loginMessage No user found.'});

                if (!user.validPassword(password)){
                    // false in done() indicates to the strategy that authentication has
                    // failed
                    return done(null, false, {message: 'loginMessage Wrong password.'});
                }
                // otherwise, we put the user's email in the session
                else {
                    // in app.js, we have indicated that we will be using sessions
                    // the server uses the included modules to create and manage
                    // sessions. each client gets assigned a unique identifier and the
                    // server uses that identifier to identify different clients
                    // all this is handled by the session middleware that we are using 
                    req.session.username = username; // for demonstration of using express-session
                    
                    // done() is used by the strategy to set the authentication status with
                    // details of the user who was authenticated
                    return done(null, user, { message: 'loginMessage Login successful'});
                }
            });
        });

    }));

    // I think we've already got a signup function somewhere else,
    //And it's functioning well
    // but i've leave an adapted copy-paste here in case it might be useful later
    // if it isn't you can delete it later

    /*

    // for signup
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true }, // pass the req as the first arg to the callback for verification 
            
         function(req, email, password, done) {             
            process.nextTick( function() {
                User.findOne({'email': email}, function(err, existingUser) {
                    // search a user by the username (email in our case)
                    // if user is not found or exists, exit with false indicating
                    // authentication failure
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    if (existingUser) {
                        console.log("existing");
                        return done(null, false, { message: 'signupMessage That email is already taken.'});
                    }
                    else {
                        // otherwise
                        // create a new user
                        /////////// Adapt this to how our user scehema is /////////
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.username = req.body.username;
                    
                        // and save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            return done(null, newUser);
                        });

                        // put the user's email in the session so that it can now be used for all
                        // communications between the client (browser) and the FoodBuddy app
                        req.session.email=email;
                    }
                });
            });
        }));
		
	



    */







    //// these links are useful for explainign the difference between
    /// new local strategy, and new jwt strategy
    /// http://www.passportjs.org/packages/passport-local/
    /// http://www.passportjs.org/packages/passport-jwt/

    //below is also a copy-paste of the lecture demos

    // used to demonstrate JWT
    let opts = {};
    // extract token information
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    // key that was used to hash the token
    opts.secretOrKey = process.env.PASSPORT_KEY;

    // depending on what data you store in your token, setup a strategy
    // to verify that the token is valid....
    passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {

        // here I'm simply searching for a user with the email addr
        // that was added to the token


        // I changed it to useername, since that's what's currentin in our user schema
        User.findOne({'username':jwt_payload.body._id}, (err, user) => {

            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    //Create a passport middleware to handle User login
    passport.use('login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password'
    }, async (email, password, done) => {
        try {
            //Find the user associated with the email provided by the user
            User.findOne({ 'username' :  username }, function(err, user) {

                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, {message: 'No user found.'});

                if (!user.validPassword(password))
                    return done(null, false, {message: 'Oops! Wrong password.'});


                else {
                    return done(null, user, {message: 'Login successful'});
                }
            });
        } catch (error) {
            return done(error);
        }
    }));






}