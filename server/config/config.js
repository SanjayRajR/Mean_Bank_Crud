// check env.
var env = process.env.NODE_ENV || 'development';

//var env = process.env.IP || '192.168.99.1000',
  //  port = process.env.NODE_ENV || 'development';
// fetch env. config
var config = require('./config.json');
var envConfig = config[env];
// add env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);