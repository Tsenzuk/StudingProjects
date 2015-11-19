var koa = require('koa');
var serve = require('koa-static');
var koaBody = require('koa-body');
//var mongoose = require('mongoose');
var jade = new (require('koa-jade'))({viewPath:'./views/', noCache:true});
//var fs = require("fs");

/*var config = require('./lib/config');
require('./models/project');

mongoose.connection.on('error', function(err) {
  console.log(err);
});
mongoose.connect(config.db.url);*/

var app = koa();
//var projectsRouter = require('./routes/projects');

app.use(jade.middleware);
app.use(koaBody({ formidable: { uploadDir: __dirname } }));
app.use(serve('./public'));

//app.use(projectsRouter.routes());
app.use(require('./lib/mongo.js')());
app.use(require('./lib/routes.js')());

app.use(function*() {
  this.status = 404;
  this.body = 'Page Not Found';
});

app.listen(process.env.PORT || 3000);