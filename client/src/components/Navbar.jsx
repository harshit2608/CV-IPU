import {
    PermIdentityOutlined,
    AddSharp,
    ArrowDropDown,
    Search,
    ShoppingCartOutlined,
    Star,
    PersonAdd,
    ChatBubbleOutline,
} from '@material-ui/icons';
import React, { Fragment } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import GrassIcon from '@mui/icons-material/Grass';
import LogOutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import styled from 'styled-components';
import { Badge } from '@material-ui/core';
import { Link, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    height: 60px;
    background-color: #92e6a7;
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* color : white; */
`;
const Catagories = styled.span`
    font-size: 16px;
    cursor: pointer;
`;

const Left = styled.div`
    flex: 5;
    display: flex;
    cursor: pointer;
`;

const Right = styled.div`
    flex: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* color : white; */
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
    // color : white;
`;
const SearchContainer = styled.div`
    display: flex;
    flex: 2;
    border: 1px solid lightgray;
    align-items: center;
    margin-left: 5px;
    padding: 1px;
    background-color: white;
`;
const CatagoryArrow = styled.div`
    margin-right: 5px;
`;

const Input = styled.input`
    border: none;
    margin-left: 5px;
    margin-right: 5px;
`;
const Logo = styled.h1`
    font-weight: bold;
    color: black;
    margin-left: 40px;
`;
const MenuItem = styled.div`
    font-weight: bolder;
    font-size: 16px;
    cursor: pointer;
    color: black;
    margin: 2px 2px;

    &:hover {
        // background-color: #e9f5f5;
        opacity: 1;
        transform: scale(1.1);
    }
`;

const Button = styled.button`
    font-size: 16px;
    color: white;
    font-weight: 500;
    padding: 5px 10px;
    border: none;
    /* border: 2px solid palevioletred; */
    border-radius: 15px;
    cursor: pointer;
    background-color: #2dc653;
`;

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fun = () => {
        const obj = JSON.parse(localStorage.getItem('user')) || null;
        if (obj !== null) {
            // console.log('not null');
            setIsLoggedIn(true);
        } else {
            // console.log('null');
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        fun();
    });

    const navigate = useNavigate();
    const gotoHome = () => {
        navigate('/');
    };

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.setItem('user', null);
        window.alert('Log Out SuccessFull');
        // navigate('/', { replace: true });
        // <Navigate replace to="/"></Navigate>;
        gotoHome();
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to={'/'}>
                        <Logo>
                            Conservation Village
                            <Badge color="white">
                                <GrassIcon />
                            </Badge>
                        </Logo>
                    </Link>
                    {/* <Catagories>Catagories</Catagories>
                    <CatagoryArrow><ArrowDropDown/></CatagoryArrow>
                    <SearchContainer>
                        <Input/>
                        <Search style={{color:"grey",fontSize:16}}/>
                    </SearchContainer> */}
                </Left>
                <Center></Center>
                <Right>
                    <Link to={'/'}>
                        <MenuItem>
                            Home
                            <Badge color="black"></Badge>
                        </MenuItem>
                    </Link>
                    {isLoggedIn ? (
                        <Link to={'/profile'}>
                            <MenuItem>
                                Profile
                                <Badge color="black">
                                    <PermIdentityOutlined />
                                </Badge>
                            </MenuItem>
                        </Link>
                    ) : (
                        <></>
                    )}
                    {isLoggedIn ? (
                        <Link to={'/messenger'}>
                            <MenuItem>
                                Chats
                                <Badge color="black">
                                    <ChatBubbleOutline />
                                </Badge>
                            </MenuItem>
                        </Link>
                    ) : (
                        <></>
                    )}

                    {isLoggedIn ? (
                        <MenuItem>
                            <Link to={'/addProduct'}>
                                <Button>
                                    Add Product
                                    <Badge color="secondary">
                                        <AddSharp />
                                    </Badge>
                                </Button>
                            </Link>
                        </MenuItem>
                    ) : (
                        <></>
                    )}

                    {!isLoggedIn ? (
                        <Link to={'/register'}>
                            <MenuItem>
                                Register
                                <Badge color="black">
                                    <PersonAddAltIcon />
                                </Badge>
                            </MenuItem>
                        </Link>
                    ) : (
                        <></>
                    )}

                    {isLoggedIn ? (
                        <Link to={'/logout'}>
                            <MenuItem onClick={handleLogout}>
                                LogOut
                                <Badge color="black">
                                    <LogOutIcon />
                                </Badge>
                            </MenuItem>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <MenuItem>
                                LogIn
                                <Badge color="black">
                                    <LoginIcon />
                                </Badge>
                            </MenuItem>
                        </Link>
                    )}
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
