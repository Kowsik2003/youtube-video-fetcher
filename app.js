const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
//const morgan = require('morgan');
const cors = require('cors');

const videoCtrl = require('./controller/videoCtrl');
const errCtrl = require('./controller/errorCtrl');
const loopFn = require('./controller/loopFetch');

const app = express();

//app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//app.get('/',videoCtrl.fetchVideo);
const fn = async  () => await loopFn();
//for(let i=0;i<2;++i)
	// fn();

setInterval(fn,process.env.TIME_INTERVEL);

app.get('/videos',videoCtrl.getAllVideo);

app.use(errCtrl);

dotenv.config({path : path.join(__dirname,'config.env')});

mongoose.connect(process.env.MONGODB_CLOUD,()=> console.log('DB connected . . .'));

app.listen(process.env.PORT,()=> console.log('App runnig . . .'));
