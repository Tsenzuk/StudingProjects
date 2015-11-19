module.exports = function(app){
  app.config = {
  	db:{
  		url:'mongodb://localhost/projects'
  	}
  }
  return function *(next){
    yield next;
  }
}