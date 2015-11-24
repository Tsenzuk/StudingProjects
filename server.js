var koa = require('koa');
var serve = require('koa-static');
var koaBody = require('koa-body');
var jade = new (require('koa-jade'))({viewPath:'./views/', noCache:true});

var app = koa();

app.use(require('koa-validate')());
app.use(jade.middleware);
app.use(koaBody({ formidable: { uploadDir: __dirname } }));
app.use(serve('./public'));

app.use(require('./lib/config.js')(app));
app.use(require('./lib/mongo.js')(app));
app.use(require('./lib/routes.js')());

app.use(function*() {
  this.status = 404;
  this.body = 'Page Not Found';
});

app.listen(process.env.PORT || 3000);