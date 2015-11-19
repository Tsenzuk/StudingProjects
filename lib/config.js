module.exports = function(app){
  app.config = require('../config.json');
  return function *(next){
    yield next;
  }
}