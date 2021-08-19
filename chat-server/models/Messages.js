const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    messageDate: {
        type: 'date',
        required: true
    },
    messageText: {
        type: 'string',
        required: true
    },
    messageWriter: {
        type: 'string',
        required: true
    },
});

module.exports = mongoose.model('Messages', messageSchema);