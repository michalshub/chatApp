const express = require('express');
const mongoose = require('mongoose');
const router = require('./api');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const app = express();

const http = require('http');
const server = http.createServer(app);


const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const Message = require('./models/Messages')
const Conversation = require('./models/Conversations');

app.use(bodyParser.json({ limit: "500mb", extended: false }));
app.use(bodyParser.urlencoded({
    limit: "500mb",
    extended: false
}));


app.use(cors());

const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("error" + err);
    })


io.on('connection', (socket) => {

    console.log(`connection, ${new Date()}`);

    socket.on('login', (event) => {
        socket.join(event);
    });

    socket.on('sendMessage', async (message) => {
        console.log('the message   '+JSON.stringify(message));

        console.log('******newMessage*******');

        try {
            let SaveMessage = {
                messageText: message.messageText,
                messageDate: message.messageDate,
                messageWriter: message.messageWriter
            }
            let mess = new Message(SaveMessage)
            let x = await mess.save();
            console.log("🚀 ~ file: app.js ~ line 86 ~ // ~ x", x)

            let conversation = await Conversation.findById(message.conId);
            console.log(message.conId);
            conversation.messages.push(mess);
            await conversation.save();
        }
        catch (error) {
            console.log("error" + error.message);
        }
        io.to(message.customerRoom)
            .emit('message', {
                messageText: message.messageText,
                messageDate: message.messageDate,
                messageWriter: message.messageWriter
            });
        io.to('0')
            .emit('message', {
                messageText: message.messageText,
                messageDate: message.messageDate,
                messageWriter: message.messageWriter
            });
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected ${new Date()}`);
    })
})

app.use('/', router)



server.listen(3400, () => {
    console.log('listening at port 3400');
})

