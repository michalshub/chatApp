const Customer = require('../models/Customers')
const Conversation = require('../models/Conversations');

const createCustomer = async (req, res) => {
    let myCustomer = new Customer(req.body)
    console.log(myCustomer);
    try {
        await myCustomer.save();
        res.status(200).json({ myCustomer: myCustomer })
    }
    catch (error) {
        res.send("cannot save new customer: " + error.message)
    }
}

const getAllCustomers = async (req, res) => {
    console.log('*******getAllCustomers********');
    try {
        let customer = await Customer.find()

        if (customer == null) {
            res.send("could not have customer")
        }
        return res.status(200).json({ customers: customer })
    }
    catch (error) {
        res.status(500).json({ myMessage: error.message })
    }

}

const isLoginCustomer = async (req, res) => {
    console.log("*******isLoginCustomer****");

    try {
        let loginUser = await Customer.findOne({ "customerName": req.body.customerName, "customerMail": req.body.customerMail, "customerRoom": req.body.customerRoom });
        console.log(req.body);
        console.log("login user: " + loginUser);
        if (loginUser == null)
            res.status(200).json({ result: false });
        else
            res.status(200).json({ result: true });
    }
    catch (error) {
        res.status(500).json({ myMessage: error.message })
    }
}

const isExistCustomer = async (req, res) => {
    console.log("*******isExistCustomer****");
    try {
        let existUserName = await Customer.findOne({ "customerName": req.body.customerName });
        let existUserMail = await Customer.findOne({ "customerMail": req.body.customerMail });
        let existUserRoom = await Customer.findOne({ "customerRoom": req.body.customerRoom });
        if ((existUserName == null) && (existUserMail == null) && (existUserRoom == null))
            res.status(200).json({ result: false });
        else
            res.status(200).json({ result: true });
    }
    catch (error) {
        res.status(500).json({ myMessage: error.message })
    }
}

const getCustomerRoomByConId=async(req,res)=>{
    try{
        console.log("*******************getCustomerRoomByConId");

        let conversation = await Conversation.findById(req.params.conId);
        let customer=await Customer.findOne({"conversations":conversation})
        console.log(customer.customerRoom);

        res.status(200).send({ "customerRoom": customer.customerRoom })
    }
    catch(error){
        res.status(500).json({ myMessage: error.message })

    }
}

module.exports = { createCustomer, getAllCustomers, isLoginCustomer, isExistCustomer,getCustomerRoomByConId }
