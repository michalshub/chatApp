const router = require("express").Router();
const conversations = require('./controllers/conversations');
const customers = require('./controllers/customers');
const messages = require('./controllers/messages');

router.post('/newConversation', conversations.newConversation);
router.get('/getConversationsByCustomerId/:customerId', conversations.getConversationsByCustomerId);
router.get('/getAllConversations', conversations.getAllConversations);
router.get('/getConversationsByCustomerMail/:cusMail', conversations.getConversationsByCustomerMail);


router.post('/newMessage/:conId', messages.newMessage);
router.get('/getMessagesByConversationId/:conId', messages.getMessagesByConversationId);
router.get('/getAllMessages', messages.getAllMessages);

router.post('/createCustomer', customers.createCustomer);
router.post('/getAllCustomers', customers.getAllCustomers);
router.post('/isLoginCustomer', customers.isLoginCustomer);
router.post('/isExistCustomer', customers.isExistCustomer);
router.get('/getCustomerRoomByConId/:conId', customers.getCustomerRoomByConId);


module.exports = router;