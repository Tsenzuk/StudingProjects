var Router = require('koa-router');
var projectSchema = require("../schemas/project");
var mongoose = require('mongoose');

var Project = mongoose.model('Project', projectSchema);

var projectsRouter = new Router({
    prefix: '/projects'
});

projectsRouter.get("/", function*(next) {
    var projects = yield Project.find({});
    //this.body = projects
    this.render('projects', {
        projects: projects,
        title: "Projects"
    }, true);
}).post("/", function*(next) {
    var project = new Project({
        title: "blah"
    });
    yield project.save();
}).get("/:id", function*(next) {
    var projects = yield Project.find({
        _id: this.params.id
    });
    this.render('project_view', {
        projects: projects,
        title: "Project" + this.params.id
    }, true);
}).get("/:id/edit", function*(next) {
    var projects;
    if (this.params.id == "-1") {
        projects = [new Project()];
    }
    else {
        projects = yield Project.find({
            _id: this.params.id
        });
    }
    this.render('project_edit', {
        projects: projects,
        title: "Project" + this.params.id
    }, true);
}).post("/:id/edit", function*(next) {
    var project;
    if (this.params.id == "-1") {
        project = new Project(this.request.body);
        project.save();
    }
    else {
        project = yield Project.findOneAndUpdate({
            _id: this.params.id
        }, this.request.body, {
            'new': true
        });
    }
    this.redirect("/projects/"+project.id+"/edit/");
}).get("/:id/delete", function*(next) {
    var projects = yield Project.find({
        _id: this.params.id
    });
    this.render('project_delete', {
        projects: projects,
        title: "Project" + this.params.id
    }, true);
}).post("/:id/delete", function*(next) {
    var project = yield Project.findOne({
        _id: this.params.id
    }).remove();
    this.redirect("/projects/");
});

module.exports = projectsRouter;