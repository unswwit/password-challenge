// config-overrides.js
const fs = require('fs');
const path = require('path');
const { overrideDevServer } = require('customize-cra');

module.exports = {
  devServer: overrideDevServer((config) => {
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });

    config.host = process.env.HOST || '0.0.0.0';
    config.port = process.env.PORT || 3000;

    return config;
  }),
};
