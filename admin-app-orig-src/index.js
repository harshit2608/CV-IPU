import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

import './styles/index.css';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App></App>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
