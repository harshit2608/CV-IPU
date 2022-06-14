import styled from 'styled-components';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';

import { ENDPOINT, PF } from '../config';
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import UpdateMe from './UpdateMe';
import { Button } from '@material-ui/core';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    /* display: flex; */
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    background-color: white;
    border-color: green;
    border-style: groove;
    border-width: 3px;
`;

const ImgContainer = styled.div`
    flex: 1;
    border-radius: 50%;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 5vh;
`;
const Title = styled.h3`
    font-size: 18px;
    font-weight: 500;
    flex: 1;
    margin-left: 450px;
    margin-top: 20px;
    display: flex;
`;
const ProfileName = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`;
const Email = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`;
const Phone = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`;
const Address = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`;

const Profile = () => {
    const [userProfile, setuserProfile] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const obj = JSON.parse(localStorage.getItem('user'));

    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${obj.token}`,
        },
    };
    const fetchUser = async () => {
        try {
            await axios
                .get(`${ENDPOINT}/api/v1/users/me`, options)
                .then((response) => {
                    // console.log(response.data.data.data);
                    setuserProfile(response.data.data.data);
                });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(userProfile);
    return (
        <div>
            <Navbar />
            <Container>
                <ImgContainer>
                    <Image
                        src={
                            userProfile?.profilePhoto
                                ? userProfile?.profilePhoto
                                : PF + 'person/noAvatar.png'
                        }
                    />
                </ImgContainer>
                <Title>
                    Name :<ProfileName>{userProfile?.name}</ProfileName>
                </Title>
                <Title>
                    Email :<Email>{userProfile?.email}</Email>
                </Title>
                <Title>
                    Phone Number :<Phone>{userProfile?.phoneNumber}</Phone>
                </Title>
                {/* <Title>
                    Email Verified :
                    <Address>{userProfile?.verifiedEmail}</Address>
                </Title>
                    */}
                <Title>
                    Address :<Address>{userProfile?.address}</Address>
                </Title>
                {/* <Button onClick={<Navigate replace to="/updateme" />}>
                    Update Data
                </Button> */}
                <UpdateMe></UpdateMe>
            </Container>
            <Footer />
        </div>
    );
};

export default Profile;
