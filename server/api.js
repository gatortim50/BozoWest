var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var Jobs = require('./models/Jobs.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var request = require('request');
var moment = require('moment');
var morgan = require('morgan');
var io = require('socket.io').listen(server);

var app = express();
var secret = 'shhh..';

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(passport.initialize());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

// -- ROUTES ---------------------------------

var strategyOptions = {
  usernameField: 'email'
};

var loginStrategy = new LocalStrategy(
  strategyOptions,
  function (email, password, done) {

    var searchUser = {
      email: email
    };

    User.findOne(searchUser, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {message: 'Wrong email/password'});
      }

      user.comparePasswords(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false, {message: 'Wrong email/password'});
        }

        return done(null, user);
      });
    });
  });

var registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

  var searchUser = {
    email: email
  };

  User.findOne(searchUser, function (err, user) {
    if (err) {
      return done(err);
    }

    if (user) {
      return done(null, false, {message: 'Email already exists'});
    }

    var newUser = new User({
      email: email,
      password: password
    });

    newUser.save(function (err) {
      if (err) {
        console.log('err: ' + err);
      }

      done(null, newUser);
    });
  });

});

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

// basic route
app.get('/', function(req, res) {
  res.send('CloudWest API is at http://localhost:8000');
});

app.post('/register', passport.authenticate('local-register'), function (req, res) {
  createSendToken(req.user, res);
});

app.post('/login', passport.authenticate('local-login'), function (req, res) {
  createSendToken(req.user, res);
});


function createSendToken(user, res) {
  var payload = {
    sub: user.id,
    exp: moment().add(10, 'days').unix()
  };

  var token = jwt.encode(payload, secret);

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}


app.get('/jobs', function (req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, secret);
  if (!payload.sub) {
    res.status(401).send({message: 'Authentication failed'});
  }

  res.json(Jobs.findAll());

});

app.get('/job/:id', function(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, secret);
  if (!payload.sub) {
    res.status(401).send({message: 'Authentication failed'});
  }

  res.json(Jobs.findById(req));
});


// -- Google ----------------------------------------------

app.post('/auth/google', function (req, res) {
  var url = 'https://accounts.google.com/o/oauth2/token';
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type: 'authorization_code',
    client_secret: 'jTdZVhQGkt0f5OvcHMAMScdR'
  };

  request.post(url, {
    json: true,
    form: params
  }, function (err, response, token) {

    var accessToken = token.access_token;
    var headers = {
      Authorization: 'Bearer ' + accessToken
    };

    request.get({
      url: apiUrl,
      headers: headers,
      json: true
    }, function (err, repsonse, profile) {

      User.findOne({googleId: profile.sub}, function (err, foundUser) {
        if (foundUser) {
          return createSendToken(foundUser, res);
        }

        var newUser = new User();
        newUser.googleId = profile.sub;
        newUser.displayName = profile.name;
        newUser.save(function (err) {
          if (err) {
            return next(err);
          }

          createSendToken(newUser, res);
        })

      });

    });

  });
});


// --- Mongoose ------------------------------

mongoose.connect('mongodb://localhost/cloudwest');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error...'));

db.once('open', function callback() {
  console.log('Database opened');
});

// --- Sockets --------------------------------

var server = app.listen(8000, function () {
  console.log('api listening on ', server.address().port);
});

// set up our socket server
require('./sockets/base')(io);



