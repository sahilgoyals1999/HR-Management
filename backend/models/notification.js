const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
		employeeId: {
			type: Schema.Types.ObjectId,
			ref: 'Employee',
			required: true
		},
		reason: {
			type: String,
			required: true
   	},
   	reply: {
   		type: String,
   		default: 'unseen'
   	}
  },
  { timestamps: true }
);

notificationSchema.methods.addReply = function(answer) {
	let abcdef = this.reply;
	abcdef = answer;
	this.reply = abcdef;
	return this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);