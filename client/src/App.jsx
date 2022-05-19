import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import Messenger from './pages/Messenger';
import Home from './pages/Home';
import Login from './pages/Login';

import { AuthContext } from './context/AuthContext';

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate replace to="/" /> : <Login />}
                />
                <Route path="/" element={<Home></Home>} />
                <Route
                    path="/messenger"
                    element={
                        !user ? <Navigate replace to="/" /> : <Messenger />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
