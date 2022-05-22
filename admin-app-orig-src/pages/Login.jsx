// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { login } from '../actions';

// const Login = (props) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const auth = useSelector((state) => state.auth);

//     const dispatch = useDispatch();

//     const userLogin = (e) => {
//         e.preventDefault();

//         const user = { email, password };
//         dispatch(login(user));
//     };

//     if (auth.authenticate) {
//         return <Navigate to={`/`} />;
//     }
//     return (
//         <div className="login">
//             <form action="" className="login__form" onSubmit={userLogin}>
//                 <h1>Login Here ☣️</h1>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit" className="submit__btn">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../components/UI/Input';
import { login } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        dispatch(login(user));
    };

    if (auth.authenticate) {
        return <Navigate to={`/`} />;
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Signin;
