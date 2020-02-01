require('ignore-styles')

require("@babel/register")({
  ignore:[/(node_module)/],
  presets: ["@babel/preset-env","@babel/preset-react"]
});

// Import the rest of our application.
module.exports = require('./server.js')