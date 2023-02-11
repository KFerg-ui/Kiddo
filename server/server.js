const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 8000;

const app = express();
const router = express.Router();
const { routes } = require('./routes');

const whitelist = [
  'http://localhost:3000',
  `http://localhost:${PORT}`,
  'https://kiddo-sales.herokuapp.com/'
];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.warn('Origin rejected');
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Base middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register all routes
routes.forEach(({ method, path, functions }) => router.route(path)[method](...functions));

app.use(router);

// Production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('/app/client/build')));

  console.info(`Path: ` + path);
  console.info('=== PRODUCTION ENVIRONMENT ===');
  
  app.get('*', function (req, res) {
    res.sendFile(path.join('app/client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.info(`Now listening on port ${PORT}.`);
});
