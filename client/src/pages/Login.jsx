// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import "react-bootstrap";
// import axios from "axios";
// import { ENDPOINT } from "../config";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       // setLoading(true);

//       const { data } = await axios.post(
//         `${ENDPOINT}/api/v1/users/login`,
//         {
//           email,
//           password,
//         },
//         config
//       );

//       console.log(data);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };
//   return (
//     <Form onSubmit={submitHandler}>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           type="email"
//           value={email}
//           placeholder="Enter email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default Login;

import React, { useContext, useRef } from 'react';
import '../styles/Login.css';
import { loginCall } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress } from '@material-ui/core';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Lamasocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on
                        Lamasocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            minLength="6"
                            className="loginInput"
                            ref={password}
                        />
                        <button
                            className="loginButton"
                            type="submit"
                            disabled={isFetching}
                        >
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                'Log In'
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ) : (
                                'Create a New Account'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
