import { createStore,combineReducers } from 'redux';
import customerReducer from '../reducers/customer'
import messageReducer from '../reducers/messages';

const reducer=combineReducers({customerReducer,messageReducer})

const store = createStore(reducer);
window.store = store;
export default store;