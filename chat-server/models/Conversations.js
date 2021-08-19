const mongoose = require('mongoose');
const Messages = require('./Messages');

const conversationSchema = mongoose.Schema({
    customerName: {
        type: 'string',
        required: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages'
        }
    ]

})



module.exports = mongoose.model('Conversations', conversationSchema);
