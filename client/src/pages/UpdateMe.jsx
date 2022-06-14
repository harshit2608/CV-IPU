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

const UpdateMe = () => {
    const [name, updateName] = useState('');
    const [address, updateAdress] = useState('');
    const [profilePhoto, updateProfilePhoto] = useState('');
    const [phoneNumber, updatePhoneNumber] = useState('');

    const navigate = useNavigate();

    const handleName = (e) => {
        updateName(e.target.value);
    };
    const handleAddress = (e) => {
        updateAdress(e.target.value);
    };
    const handlePicture = (e) => {
        updateProfilePhoto(e.target.value);
    };
    const handlePhoneNumber = (e) => {
        updatePhoneNumber(e.target.value);
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
                'http://localhost:3000/api/v1/users/updateMe',
                {
                    name: name,
                    profilePhoto: profilePhoto,
                    address: address,
                    phoneNumber: phoneNumber,
                },
                options
            )
            .then((response) => {
                console.log(response);
            });
        window.alert('Profile Updated successfully');
    };
    console.log(`${name} ${address} ${phoneNumber}`);

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Edit Profile Data</Title>
                    <Form>
                        <Input
                            type="text"
                            value={name}
                            onChange={handleName}
                            placeholder="Updated Name"
                        />
                        <Input
                            type="text"
                            value={address}
                            onChange={handleAddress}
                            placeholder="Updated Address"
                        />
                        <Input
                            type="text"
                            value={profilePhoto}
                            onChange={handlePicture}
                            placeholder="Update Profile Photo"
                        />
                        <Input
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                            placeholder="Updated Phone Number"
                        />
                        {/* <Input type="file" value={img} onChange={handleImg} placeholder="Add image" /> */}
                        <ButtonWrapper>
                            <Button onClick={handleAPI}>Update Data</Button>
                        </ButtonWrapper>
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    );
};

export default UpdateMe;
