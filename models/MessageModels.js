const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	message: {
		type: String
	},
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }],
	sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
	read: { type: Date },
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
