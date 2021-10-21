const Video = require('../model/videoModel');
const AppError = require('../utils/AppError');

exports.getAllVideo = async (req,res,next) => {

	let query = Video.find().select('-__v');//.select('-__v');

	query = query.sort('-publishedAt');



	if(req.query.title)
	{
			query = query.find({$text : {$search  :req.query.title}});	
	}	
	if(req.query.description)
		query = query.find({description : req.query.description});

	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page-1)*limit;

	if(req.query.page)
	{
		const totalVideos = await Video.countDocuments();
		if(skip>=totalVideos)
			return next(new AppError('The give page does not exist !',400));
	}

	

	query = query.skip(skip).limit(limit);
//	console.log(req.query);

	const videos = await query;

	res.status(200).json({
		status : 'success',
		statusCode : 200,
		data : {
			no_of_videos : videos.length,
			videos
		}
	});
}
