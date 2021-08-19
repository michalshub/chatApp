const Message = require('../models/Messages')
const Conversation = require('../models/Conversations');

const newMessage = async (req, res) => {
    console.log('******newMessage*******');
    try {
        let mess = new Message(req.body)
        await mess.save();
        let conversation = await Conversation.findById(req.params.conId);
        conversation.messages.push(mess);
        await conversation.save();
        res.status(200).json({ message: mess })
    }
    catch (error) {
        res.send("cannot save new message: " + error.message)
    }
}

const getMessagesByConversationId = async (req, res) => {
    try {
        let conversation = await Conversation.findById(req.params.conId).populate('messages');
        console.log(conversation);
        res.status(200).send({ "messages": conversation.messages })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

const getAllMessages = async (req, res) => {
    try {
        console.log("********getAllMessages*****");
        let messages = await Message.find()
        if (messages == null) {
            res.send("could not have messages")
        }
        console.log("messages: " + messages);
        return res.status(200).json({ messages: messages })
    }
    catch (err) {
        res.status(500).json({ error: error });
    }
}
module.exports = { newMessage, getMessagesByConversationId, getAllMessages }
