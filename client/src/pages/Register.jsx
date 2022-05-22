import React, { useContext, useRef } from 'react';
import { CircularProgress } from '@material-ui/core';
import { signUpCall } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';

import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.1)
        ),
        url('https://www.dropbox.com/s/0uxieikar1cze2q/keith-misner-h0Vxgz5tyXA-unsplash.jpg?dl=1')
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    opacity: 0.9;
    border-radius: 2%;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    opacity: 1;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    opacity: 1;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const ButtonWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    opacity: 1;
    width: 100%;
`;
const Button = styled.button`
    width: 50%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Register = () => {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const phoneNumber = useRef();

    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        signUpCall(
            {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                passwordConfirm: passwordConfirm.current.value,
                phoneNumber: phoneNumber.current.value,
            },
            dispatch
        );
    };
    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form onSubmit={handleClick}>
                        <Input
                            placeholder="Name"
                            type="text"
                            ref={name}
                            required
                        />
                        <Input
                            type="number"
                            placeholder="phone number"
                            // value={phoneNumber}
                            ref={phoneNumber}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="email"
                            ref={email}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            // value={password}
                            ref={password}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="confirm password"
                            // value={passwordConfirm}
                            ref={passwordConfirm}
                            required
                        />
                        <Agreement>
                            By creating an account, I consent to the processing
                            of my personal data in accordance with the{' '}
                            <b>PRIVACY POLICY</b>
                        </Agreement>
                        <ButtonWrapper>
                            <Button type="submit" disabled={isFetching}>
                                {isFetching ? (
                                    <CircularProgress
                                        color="white"
                                        size="20px"
                                    />
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                            {/* <Button>SignUp</Button> */}
                        </ButtonWrapper>
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    );
};

export default Register;
