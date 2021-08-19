const mongoose = require('mongoose');
const Conversations = require('./Conversations');

const customersSchema = mongoose.Schema({
    customerName: {
        type: 'string',
        required: true
    },
    customerMail: {
        type: 'string',
        required: true
    },
    customerRoom: {
        type: 'string',
        required: true
    },
    conversations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversations'
        }
    ],
});

module.exports = mongoose.model('Customers', customersSchema);