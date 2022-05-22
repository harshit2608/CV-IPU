import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import './styles/index.css';

const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    //componentDidMount or componentDidUpdate
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }
        if (auth.authenticate) {
            dispatch(getInitialData());
        }
    }, [auth.authenticate]);

    return (
        <div>
            <Router>
                <Routes>
                    <PrivateRoute
                        path="/"
                        exact
                        element={<Home></Home>}
                    ></PrivateRoute>
                    <PrivateRoute path="/page" component={NewPage} />
                    <PrivateRoute path="/category" component={Category} />
                    <PrivateRoute path="/products" component={Products} />
                    <PrivateRoute path="/orders" component={Orders} />
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/signup" element={<SignUp></SignUp>}></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
