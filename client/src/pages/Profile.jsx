import styled from 'styled-components'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Container = styled.div`
    width: 100%;
    height: 100vh;
  /* display: flex; */
    align-items: center;
    justify-content: center;
`


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
`
 const Title = styled.h3`
    font-size: 18px;
    font-weight: 500;
    flex: 1;
    margin-left: 450px;
    margin-top: 20px;
    display: flex;
`
const ProfileName = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`
const Email = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`
const Phone = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`
const Address = styled.h3`
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
`

const Profile = () => {
  return (
      <div>
        <Navbar/>
        <Container>
            <ImgContainer>
                <Image src="https://www.dropbox.com/s/rzvlck52yu2e3ao/20220502_144913.jpg?dl=1"/>
            </ImgContainer>
            <Title>
                Name :
                <ProfileName>
                    Sachin Bhola
                </ProfileName>
            </Title>
            <Title>
                Email :
                <Email>
                    sachin.27.ipu.ac.in
                </Email>
            </Title>
            <Title>
                Phone Number :
                <Phone>
                    +91 9849492729
                </Phone>
            </Title>
            <Title>
                Address :
                <Address>
                    Random Street, St.Petersburg, Alaska 
                </Address>
            </Title>
        </Container>
        <Footer/>
      </div>
  )
}

export default Profile
