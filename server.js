const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const sass = require('node-sass-middleware');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const respondInternalError = require('./middlewares/error');

const newsfeedRoutes = require('./routes/newsfeedsRoutes');
const auth = require('./routes/authRoutes');
const usersRoutes = require('./routes/userRoutes');

//load env var
dotenv.config({
	path: './config/config.env'
});

console.log(process.env.NODE_ENV);

const app = express();
// Middlewares
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 60000 },
		resave: false,
		saveUninitialized: false
	})
);
app.use(flash());

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

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

app.use('/auth', auth);
app.use('/users', usersRoutes);
app.use('/ranter/newsfeed', newsfeedRoutes);

app.get('/', (req, res) => {
	if (req.cookies.jwt) {
		return res.redirect('/ranter/newsfeed');
	}
	res.render('index');
});

app.use(respondInternalError);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
	)
);

//Connect to DB
connectDB();

//Handle unheandle promise rejection
process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error.message}`.red);
	//close server & exit process
	server.close(() => {
		process.exit(1);
	});
});
