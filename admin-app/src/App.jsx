import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Category from './pages/Category/Category';
import NewPage from './pages/NewPage';

function App() {
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
        // <Router>
        //     <Fragment>
        <div className="App">
            <Routes>
                <Route path="/login" component={<Signin></Signin>} />
                <Route path="/signup" component={<Signup />} />
                <Route path="/" component={<Home></Home>}></Route>
                {/* <Route exact path="/" element={<PrivateRoute />}>
                    <Route exact path="/" element={<Home />} />
                </Route> */}
                {/* <PrivateRoute path="/" exact component={Home} /> */}
                {/* <PrivateRoute path="/page" component={NewPage} /> */}
                {/* <PrivateRoute path="/category" component={Category} /> */}
                {/* <PrivateRoute path="/products" component={Products} /> */}
                {/* <PrivateRoute path="/orders" component={Orders} /> */}
            </Routes>
        </div>
        //     </Fragment>
        // </Router>
    );
}

export default App;

