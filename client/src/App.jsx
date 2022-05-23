import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import Messenger from './pages/Messenger';

import Profile from './pages/Profile';
import { AuthContext } from './context/AuthContext';

const App = () => {
    // const user = useSelector((state) => state.user.currentUser);
    const { user } = useContext(AuthContext);
    // console.log(user);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={user ? <Navigate replace to="/" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route path="product" element={<Product />} />
                <Route path="profile" element={<Profile />} />
                <Route path="addProduct" element={<AddProduct />} />
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
