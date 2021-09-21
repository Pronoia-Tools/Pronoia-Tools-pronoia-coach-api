const express = require("express");
const router = express.Router();
const config = require('../config/config');

// Import routes
const register = require("./register");
const login = require("./login");

// Create routing
const defaultRoutes = [
    {
      path: '/register',
      route: register,
    },
    {
      path: '/login',
      route: login,
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
