const Conversation = require('../models/Conversations');
const Customers = require('../models/Customers');

const newConversation = async (req, res) => {
    console.log('******newConversation*****');
    let conversation = new Conversation(req.body)
    console.log(conversation);
    try {
        await conversation.save();
        let customer = await Customers.findOne({ "customerName": req.body.customerName });
        console.log('********' + customer);
        customer.conversations.push(conversation);
        await customer.save();
        console.log('********' + customer);
        res.status(200).json({ conversation: conversation });
    }
    catch (error) {
        res.send("cannot save new conversation: " + error.message)
    }
}

const getConversationsByCustomerId = async (req, res) => {
    try {
        let customer = await Customers.findById(req.params.customerId)
        console.log(customer);
        res.status(200).send({ "conversations:": customer.conversations })
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

const getConversationsByCustomerMail = async (req, res) => {
    console.log('******getConversationsByCustomerMail******');
    try {
        let customer = await Customers.findOne({ customerMail: req.params.cusMail }).populate('conversations')
        res.status(200).send({ "conversations": customer.conversations })
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

const getAllConversations = async (req, res) => {
    console.log("*******getAllConversations******");
    try {
        let conversation = await Conversation.find();
        console.log("conversations: " + conversation);
        if (conversation == null) {
            res.send("could not have conversation")
        }
        return res.status(200).json({ conversation: conversation })
    }
    catch (err) {
        res.status(500).json({ error: error });
    }
}

module.exports = { newConversation, getConversationsByCustomerId, getAllConversations, getConversationsByCustomerMail }
