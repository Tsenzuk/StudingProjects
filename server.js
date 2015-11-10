var koa = require('koa');
var Router = require('koa-router');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projects');

var app = koa();
var projectsRouter = new Router({
  prefix: '/projects'
});

projectsRouter.get("/",function *(next){
    this.body = '/projects/';
});
app.use(projectsRouter.routes());
app.use(function* (){
  this.body = 'Hello World';
});

app.listen(process.env.PORT || 3000);