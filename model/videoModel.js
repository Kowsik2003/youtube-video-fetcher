const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
	title : {
		type : String ,
		required : [true,'video must have title'],
		trim : true
	},
	description : {
		type : String ,
		trim : true
	},
	publishedAt : {
		type : Date,
		required : [true,'video must have publishedAt time']
	},
	thumbnails : {
		type : String ,
		required : [true,'video must have thumbnail']
	}
});

videoSchema.index({title : 'text'});

const Video = mongoose.model('video',videoSchema);

module.exports = Video;