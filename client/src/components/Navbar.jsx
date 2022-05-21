import {
    PermIdentityOutlined,
    AddSharp,
    ArrowDropDown,
    Search,
    ShoppingCartOutlined,
    Star,
    PersonAdd,
} from '@material-ui/icons';
import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import styled from 'styled-components';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

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
    flex: 4;
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
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to={'/'}>
                        <Logo>
                            Conservation Village
                            {/* <Badge color="white">
                            <Star />
                            </Badge> */}
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
                    <Link to={'/register'}>
                        <MenuItem>
                            Register
                            <Badge color="black">
                                <PersonAddAltIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                    <Link to={'/login'}>
                        <MenuItem>
                            Sign in
                            <Badge color="black">
                                <LoginIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                    <Link to={'/profile'}>
                        <MenuItem>
                            Profile
                            <Badge color="black">
                                <PermIdentityOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
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
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
