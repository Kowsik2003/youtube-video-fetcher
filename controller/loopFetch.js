const Video = require('../model/videoModel');

const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({path : `${__dirname}/../config.env`});

const baseUrl = `${process.env.BASE_URL}`;

const getData = async url => {
	try {
		const videoData = await axios(url);
		return videoData.data.items;
	} catch(err) {
		return err;
	}
}

const para =  {
	  key : process.env.KEY,
	  q : 'cricket',
	  part : 'snippet',
	  type : 'video',
	  order : 'date',
	  maxResults : '10'
	};


let publishedAfter = '2021-10-18T15:55:42Z';
		

module.exports = async () => {
	try {
		//console.log(baseUrl);
		const data = await getData(`${baseUrl}?part=${para.part}&key=${para.key}
	 		&type=${para.type}&q=${para.q}&order=${para.order}&maxResults=
	 		${para.maxResults}&publishedAfter=${publishedAfter}`);
		
		let newData = []; // Data the needed to store in Database(Mongodb)


		let j,i; // variables used for itreation 

		for(i = (data.length-1),j=0;i>-1;--i)
		{
			if (data[i].snippet.publishedAt <= publishedAfter) // To make sure the no old or repeted data is stored
			{
				//console.log('skiped');
				continue ;
			}

			newData.push(data[i].snippet);	//	extrating the snippet from data ogject and store in newDara
			newData[j].thumbnails = newData[j].thumbnails.default.url; // storeing only default thumbnail from youtube data
			++j;
		}
		//console.log('Data present already');
		if((newData.length))	// To find data 
			publishedAfter = newData[newData.length-1].publishedAt;
		//console.log( 'next : ',publishedAfter);
		await Video.create(newData);

	} catch(err) {
		console.log(err.response);
	}
}