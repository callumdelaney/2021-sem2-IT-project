//below files are based off the passport.js in 2021 Semester 1 INFO30005_2021_SM1 Lecture
// demonstration files, Foodbuddy-testing-w10

require('dotenv').config()    // for JWT password key. Not sure if we have a .env file yet.

// used to create our local strategy for authenticating
// using username and password
const LocalStrategy = require('passport-local').Strategy;

// our user model
const { User } = require('../models/user');

// the following is required IF you wanted to use passport-jwt
// JSON Web Tokens
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
