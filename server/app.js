const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config/keys');


//LoadConfig
dotenv.config({ path: './config/config.env'});

//db connection
connectDB();

const app = express();

app.use(cors());
app.use(passport.initialize());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

let user = {}

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackUrl: "/auth/facebook/callbackUrl"
},(accessToken, refreshToken, profile, cb) => {
  console.log(JSON.stringify(profile));
  user = {...profile}
  return cb(null, profile);
}));

app.get('/auth/facebook', passport.authenticate("facebook"));
app.get('/auth/facebook/callback', passport.authenticate(("facebook"), (req, res)=>{
  res.redirect('/profile');
}));

//GOOGLE
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    callbackUrl: "/auth/google/callbackUrl"
},(accessToken, refreshToken, profile, cb) => {
  console.log(JSON.stringify(profile));
  user = {...profile}
  return cb(null, profile);
}));

app.get('/auth/google', passport.authenticate("google", { scope: ["profile", "email"] }));
app.get('/auth/google/callback', passport.authenticate(("google"), (req, res)=>{
  res.redirect('/profile');
}));

app.get('/user/', (req, res) => {
  console.log('Getting user data');
  res.send(user);
});

app.get('/auth/logout', (req, res) => {
  console.log('Logging out');o
  user = {};
  res.redirect('/');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{ 
  console.log(`ENV: ${process.env.NODE_ENV} mode, listen on PORT: ${PORT}`);
});

  
