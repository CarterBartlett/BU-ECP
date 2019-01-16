// Import required packages
const express = require('express'); // HTTP server
const cookieSession = require('cookie-session'); // Cookie-based authentication
const passport = require('passport'); // Authentication flows made easier
const bodyParser = require('body-parser'); // Parses bodies ahead of time
const expressTimestamp = require('express-timestamp'); // Timestamps requests to the server

// Import configuration settings
const keys = require('./config/keys');

// Import services
require('./services/googleDatastore');
require('./services/passport');

// Import models
require('./models/user');

// Instantiate app
const app = express();

// Determine environment
const CURRENT_ENVIRONMENT = process.env.NODE_ENV;
const PRODUCTION = 'production';

// Middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    keys: [keys.cookieKey],
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(expressTimestamp.init);

// Routes
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/requestRoutes')(app);

if (CURRENT_ENVIRONMENT != PRODUCTION) {
  require('./routes/debugRoutes')(app);
}

// If running in production, provide the "build" version for client-side of app
if (CURRENT_ENVIRONMENT == PRODUCTION) {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Port
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT);
