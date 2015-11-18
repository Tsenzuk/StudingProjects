var Router = require('koa-router');
var Project = require("mongoose").model("Project");

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
  try{
    this.project = yield Project.findOne({ _id: id });
    this.title = 'Project' + this.params.id;
  }catch(e){
    this.title = 'New Project';
  }
  yield next;
}).get('/:id', function*(next) {
  if(!this.project){
    this.redirect('/404/');
    return;
  }
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
  if(this.project){
    this.project.update(this.request.body, { 'new': true});
  } else {
    this.project = new Project(this.request.body);
    yield this.project.save()
  }
  this.redirect('/projects/' + this.project.id + '/edit/');
}).get('/:id/delete', function*(next) {
  if(!this.project){
    this.redirect('/404/');
    return;
  }
  this.render('project_delete', {
    project: this.project,
    title: this.title
  });
}).post('/:id/delete', function*(next) {
  if(this.project){
    yield this.project.remove();
  }
  this.redirect('/projects/');
});

module.exports = projectsRouter;