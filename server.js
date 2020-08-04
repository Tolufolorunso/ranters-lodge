const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const sass = require('node-sass-middleware');

const newsfeedRoutes = require('./routes/newsfeedsRoutes');

//load env var

dotenv.config({
	path: './config/config.env'
});

console.log(process.env.NODE_ENV);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
	sass({
		src: __dirname + '/sass',
		dest: __dirname + '/public/stylesheets/',
		// debug: true,
		outputStyle: 'compressed',
		prefix: '/stylesheets'
	})
);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/newsfeed', newsfeedRoutes);

app.get('/', (req, res) => {
	res.render('index');
});

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
