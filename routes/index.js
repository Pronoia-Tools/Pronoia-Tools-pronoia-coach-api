const express = require("express");
const router = express.Router();
const config = require('../config/config');

// Import routes
const authRoute = require('./auth.route');

// Create routing
const defaultRoutes = [
    {
      path: '/auth',
      route: authRoute,
    },
  ];
  
const devRoutes = [
    // routes available only in development mode
    // {
    //     path: '/docs',
    //     route: docsRoute,
    // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;
