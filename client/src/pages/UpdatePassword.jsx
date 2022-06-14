import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
        url('https://www.dropbox.com/s/i1j9scblsigcw0w/148c3fea-c63f-4070-a485-9ffa4416d6ec.jpg?dl=1')
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
    /* font-weight: bolder; */
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
    margin-top: 30px;
`;

const UpdateMyPassword = () => {
    const [currentPassword, updateCurrentPassword] = useState('');
    const [password, updatePassword] = useState('');
    const [confirmPassword, updateConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handlePassword = (e) => {
        updatePassword(e.target.value);
    };
    const handleCurrentPassword = (e) => {
        updateCurrentPassword(e.target.value);
    };
    const handleConfirmPassword = (e) => {
        updateConfirmPassword(e.target.value);
    };

    const obj = JSON.parse(localStorage.getItem('user'));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${obj.token}`,
        },
    };

    const handleAPI = (e) => {
        e.preventDefault();
        axios
            .patch(
                'http://localhost:3000/api/v1/users/updateMyPassword',
                {
                    password: password,
                    passwordConfirm: confirmPassword,
                    passwordCurrent: currentPassword,
                },
                options
            )
            .then((response) => {
                console.log(response);
            });
        window.alert('Profile Updated successfully');
    };

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Update Password</Title>
                    <Form>
                        <Input
                            type="text"
                            value={currentPassword}
                            onChange={handleCurrentPassword}
                            placeholder="Enter Current Password"
                        />
                        <Input
                            type="text"
                            value={password}
                            onChange={handlePassword}
                            placeholder="Enter New Password"
                        />
                        <Input
                            type="text"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder="Confirm New Password"
                        />
                        <ButtonWrapper>
                            <Button onClick={handleAPI}>Update Password</Button>
                        </ButtonWrapper>
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    );
};

export default UpdateMyPassword;
