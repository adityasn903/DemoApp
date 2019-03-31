const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");

const { ObjectID } = require("mongodb");
const _ = require("lodash");
const { mongoose } = require("../api/db/mongoose");
const {  users  } = require("../api/models/users");
var { authenticate } = require("../api/middleware/authenticate");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require('jsonwebtoken')

var details = {
  id: "",
  displayName: "",
  email: ""
};

let loggedUser = {};
let sesToken = null

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: "secretkey",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 1200000 }
  })
);

var GOOGLE_CLIENT_ID =
    "334130888792-k6o29chq2bhv29rmlm4elmvaiqogd9ae.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET = "MZc_kKCMbPTcw-xEY4Di1AxW";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      // process.nextTick(function () {

      //     details.id = profile.id;
      //     details.displayName = profile.displayName;
      //     details.email = profile.email;
      //     return done(null, profile);
      // });

      users.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have this user
          // console.log("user is: ", currentUser);
          currentUser.loggedInAt = new Date()
          var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
          currentUser.tokens[0].token = token;
          currentUser.loginFlag =true;
          currentUser.save();

          sesToken = currentUser.tokens[0].token
          loggedUser = {};
          loggedUser = currentUser;
          done(null, currentUser);

          
        }else {
          let email = [];
          email.push(profile.email);
          // if not, create user in our db'
          // new Googleusers({
          //   googleId: profile.id,
          //   fullName: profile.displayName,
          //   contact: email
          // })
          //   .save()
          //   .then(newUser => {
          //       loggedUser = {};
          //     loggedUser = currentUser;
          //     console.log("created new user: ", newUser);
          //     done(null, newUser);
          //   });
          var newUser = new users({
            // googleId: profile.id,
            //  fullName: profile.displayName,
            // contact: email,
            fullName: profile.displayName,
            password: "",
            googleId: profile.id,
            contact: email,
            gender: "",
            zipCode: "",
            createdAt: new Date(),
            loginFlag :true

          });
          newUser
            .save()
            .then(() => {
              return newUser.generateAuthToken();
            })
            .then(token => {
              sesToken  = token
              loggedUser = {};
              loggedUser =  newUser;
              console.log("created new user: ", newUser);
              done(null, newUser);
              
            })
        }
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  // console.log(details);
  // res.session.user = null;
  // console.log(req.user.fullName)
  req.session.authUser = {
    fullName: loggedUser.fullName,
    contact: loggedUser.contact,
    userId: sesToken
  };
  res.redirect("/");
});

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send("You are not logged in");
  } else {
    console.log(req.user);
    next();
  }
};

app.get("/", (req, res) => {
  //console.log('In auth User')
  //console.log(req.user)
  //console.log('printing logged user')
  // console.log(loggedUser)
  res.send(req.session.authUser);
});

export default {
  path: "/auth/",
  handler: app
};
