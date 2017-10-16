const express = require('express'); //imports in the required express library
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express(); //generates a new, running express app

//important features to use passport
passport.use(
  //GoogleStrategy is specific to google+ login. Is named 'google'
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    //what do after receiving a callback
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);

app.get(
  '/auth/google', //our route
  //use 'google' to access GoogleStrategy
  passport.authenticate('google', {
    scope: ['profile', 'email'] //specific scopes that are names within google's oauth
  })
);

//for passport to handle the account upon callback
//passport will see that the user code=xxxxx is within the URL
app.get('/auth/google/callback', passport.authenticate('google'));

//prints the object upon visiting localhost:5000/
app.get('/', (req, res) => {
  res.send({
    hi: 'there',
    we: 'are hosted!'
  });
});

//prints the object upon visiting localhost:5000/greeting
app.get('/greeting', (req, res) => {
  res.send({ hi: 'there' });
});

//dynamic port binding from heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
