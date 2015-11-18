var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var STATUSES = ['started','finished','in progress'];

const THREE_DAYS_IN_MS = 3*24*60*60*1000;

var projectSchema = new Schema({
	title: {type: String, default: 'Project title'},
	description: {type: String, default:''},
	dateStart: {type: Date, default: Date.now },
	dateFinish: {type: Date, default: Date.now },
	_status: {type: String, default: 'undefined'}
},{
	'toJSON': { virtuals: true },
	'toObject': { virtuals: true }
});

projectSchema.virtual('status').get(function(){
	var today = (new Date()).getTime();
	
	this._status = STATUSES[2];
	
	if(today < (this.dateStart.getTime() + THREE_DAYS_IN_MS)){
	  this._status = STATUSES[0];
	}
	if(today > this.dateFinish.getTime()){
	  this._status = STATUSES[1];
	}
	
	setTimeout(this.save.bind(this),0);
	
	return this._status;
});

module.exports = mongoose.model('Project', projectSchema);