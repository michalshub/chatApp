import { produce } from 'immer';

const initialState = {
    customer: {
        customerName: '',
        customerMail: '',
        customerRoom: '',
        conversations: []
    }
};


export default produce((state, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_NAME':
            state.customer.customerName = action.payload;
            break;
        case 'SET_CUSTOMER_MAIL':
            state.customer.customerMail = action.payload;
            break;
        case 'SET_CUSTOMER_ROOM':
            state.customer.customerRoom = action.payload;
            break;
        case 'SET_CONVERSATIONS':
            state.customer.conversations.push(action.payload);
            break;
    }
}, initialState)