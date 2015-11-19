var Router = require('koa-router');
var Project = require('mongoose').model("Project");

var projectsRouter = new Router({
  prefix: '/projects'
});

projectsRouter.get('/', function*(next) {
  var projects = yield Project.find({});
  this.render('projects_list', {
    projects: projects,
    title: 'Projects'
  });
}).param('id',function*(id, next){
  !this.db.Types.ObjectId.isValid(id) && this.throw(404);
  this.project = yield Project.findOne({ _id: id });
  this.title = 'Project' + this.params.id;
  yield next;
}).get('/add/', function*(next) {
  this.render('project_edit', {
    project: undefined,
    title: 'New Project'
  });
}).post('/add', function*(next) {
  this.project = new Project()
  yield this.project.set(this.request.body).save();
  this.redirect('/projects/' + this.project.id + '/edit/');
}).get('/:id', function*(next) {
  !this.project && this.throw(404);
  this.render('project_view', {
    project: this.project,
    title: this.title
  });
}).get('/:id/edit', function*(next) {
  this.render('project_edit', {
    project: this.project,
    title: this.title
  });
}).post('/:id/edit', function*(next) {
  !this.project && this.throw(404);
  yield this.project.set(this.request.body).save();
  this.redirect('/projects/' + this.project.id + '/edit/');
}).get('/:id/delete', function*(next) {
  !this.project && this.throw(404);
  this.render('project_delete', {
    project: this.project,
    title: this.title
  });
}).post('/:id/delete', function*(next) {
  !this.project && this.throw(404);
  yield this.project.remove();
  this.redirect('/projects/');
});

module.exports = projectsRouter;