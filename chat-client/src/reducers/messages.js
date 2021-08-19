//NOTE
import { produce } from 'immer';
import io from 'socket.io-client';

const initialState = {
    message: {
        allMessages: [],
        socket: io.connect('http://localhost:3400/', {
            transports: ['websocket']
        }),
    },
     
};


export default produce((state, action) => {
    switch (action.type) {
        case 'SET_ALL_MESSAGES':
            state.message.allMessages = action.payload;
            break;
    }
}, initialState)