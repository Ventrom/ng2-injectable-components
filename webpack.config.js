/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {

  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({env: 'test'});
    break;
  case 'prod':
  case 'production':
  default:
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  //case 'dev':
  //case 'development':
  //TODO: change this
   //module.exports = require('./config/webpack.prod')({env: 'production'});
}
