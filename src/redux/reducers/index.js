import userReducer from './user';
import userNameReducer from './userName';
import chatReducer from './chat';
import { combineReducers } from 'redux';
import authReducer from './auth';

const rootReducer = combineReducers({
    user: userReducer,
    userName: userNameReducer,
    chat: chatReducer,
    auth: authReducer
});
export default rootReducer;
