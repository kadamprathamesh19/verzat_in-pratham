import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name'],
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
    },
}, {
    timestamps: true,
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
export default Message;
