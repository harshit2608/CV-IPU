import authReducer from './authReducers';
import userReducer from './userReducers';
import productReducer from './productReducers';
import categoryReducer from './categoryReducers';
import orderReducer from './orderReducers';
import pageReducer from './pageReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    page: pageReducer,
});

export default rootReducer;

