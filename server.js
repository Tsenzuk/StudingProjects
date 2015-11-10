var koa = require('koa');
var serve = require('koa-static');
var mongoose = require('mongoose');
var Jade = require('koa-jade')
var jade = new Jade({viewPath: './lib/views/'});

mongoose.connection.on('error', function(err){
    console.log(err);
});
mongoose.connect('mongodb://localhost/projects');

var app = koa();
var projectsRouter = require("./lib/routes/projects");

app.use(jade.middleware)
app.use(serve('./node_modules/jquery/dist/'));
app.use(serve('./node_modules/bootstrap/dist/'));
app.use(projectsRouter.routes());
app.use(function* (){
  this.body = 'Hello World';
});

app.listen(process.env.PORT || 3000);