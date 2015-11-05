var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Statuses = ["started","finished","in progress"];

var projectSchema = new Schema({
	title: String,
	description: String,
	dateStart: Date,
	dateFinish: Date
});

projectSchema.virtual("status").get = function(){
	var today = (new Date()).getDate();
	if(today < (this.dateStart.getDate() + 3)){
		return Statuses[0];
	}else if(today > this.dateFinish.getDate()){
		return Statuses[1];
	}else{
		return Statuses[2];
	}
}

modules.export = projectSchema;