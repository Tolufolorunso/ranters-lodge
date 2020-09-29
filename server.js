const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const socketio = require('socket.io');
const cors = require('cors');
const User = require('./models/UserModels');
const Message = require('./models/MessageModels');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const respondInternalError = require('./middlewares/error');

const auth = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const friendRoutes = require('./routes/friendRoutes');
const chatRoutes = require('./routes/chatRoutes');

//load env var
dotenv.config({
	path: './config/config.env'
});

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// Middlewares
app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		cookie: { maxAge: 60000 },
// 		resave: false,
// 		saveUninitialized: false
// 	})
// );

// Body parser
app.use(express.json({ extended: true }));

app.use(
	fileUpload({
		useTempFiles: true,
		tempFilesDir: '/tmp/'
	})
);

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

// Cookie parser
// app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/v1/auth', auth);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', friendRoutes);
app.use('/api/v1/users', chatRoutes);

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Thank God'
	});
});

app.use(respondInternalError);

const PORT = process.env.PORT || 5000;

var users = [];
// socketIo(io);
io.on('connection', socket => {
	console.log('new connection', socket.id);
	socket.on('disconnect', () => {
		socket.broadcast.emit('message', 'is offline');
	});

	socket.on('user_connected', username => {
		console.log(username);
		users[username] = socket.id;
		io.emit('user_connected', username);
	});

	socket.on('send_message', async function (data) {
		console.log(data);
		const receiver = await User.findOne({ username: data.receiver });
		const sender = await User.findOne({ username: data.sender });
		const message = await Message.create({
			message: data.message,
			users: [receiver._id, sender._id],
			sender: sender._id
		});

		const body = {
			message: data.message,
			sender: data.sender,
			senderId: sender._id,
			receiver: data.receiver,
			senderFullname: sender.name
		};

		const socketId = users[data.receiver];
		socket.to(socketId).emit('message_received', body);
	});
	console.log(users);
});

server.listen(
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
