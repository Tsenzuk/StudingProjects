var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Statuses = ["started","finished","in progress"];

var projectSchema = new Schema({
	title: {type: String, default: 'Project title'},
	description: {type: String, default:''},
	dateStart: {type: Date, default: Date.now },
	dateFinish: {type: Date, default: Date.now }/*,
	status: {type: String, default: 'undefined'}*/
},{
	'toJSON': { virtuals: true },
	toObject: { virtuals: true }
});

projectSchema.virtual("status").get(function(){
	var today = (new Date()).getDate();
	if(today < (this.dateStart.getDate() + 3)){
		return Statuses[0];
	}else if(today > this.dateFinish.getDate()){
		return Statuses[1];
	}else{
		return Statuses[2];
	}
})

module.exports = projectSchema;