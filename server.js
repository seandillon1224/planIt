const app = require('express')();
const server = require('http').createServer(app);
const io = module.exports.io = require('socket.io')(server);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const passport = require('passport');
const config = require('./config');
var multer = require("multer");
var upload = multer({storage: multer.memoryStorage({})});
var fs = require("fs");


// connect to the database and load models

require('./models').connect(config.dbUri);

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
// app.use(routes);
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
// app.use('/api/', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api/');
const nonAuthRoutes = require('./routes/nonauth')
app.use('/auth', authRoutes);
app.use('/api/', apiRoutes);
app.use('/nonauth', nonAuthRoutes)



// Start the API app
app.listen(PORT, () =>
  console.log(`🌎  ==> API server now listening on PORT ${PORT}!`)
);
