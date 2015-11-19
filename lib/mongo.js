module.exports = function(app){
  var mongoose = require('mongoose');
  var config = app.config;
  require('../models/project');
  
  mongoose.connection.on('error', function(err) {
    console.log(err);
  });
  mongoose.connect(config.db.url);
  
  return function*(next) {
    this.db = mongoose;
    yield next;
  };
}