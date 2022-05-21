import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    WhatsApp,
    Room,
    Twitter,
  } from "@material-ui/icons";
  import styled from "styled-components";
//   import { mobile } from "../responsive";
  
  const Container = styled.div`
    display: flex;
    background-color: #001D6E;
    color: white;
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const ImgContainer = styled.div`
    margin-top: 50px;
    flex: 1;
    align-items: center;
    margin: auto;
`
const InfoContainer = styled.div`
    flex: 1;
`
const Imager = styled.img`
  max-height: 70%;
  width: 100%;
`;

  const Footer = () => {
    return (
      <div>
        <ImgContainer>
            <Imager src="https://www.dropbox.com/s/zyc3wg9tky6pcuu/Screenshot%202022-05-19%20160345.png?dl=1"/>
        </ImgContainer>
      <Container>
        <Left>
          <Logo>Conservation Village</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          
        </Left>
        <Center>
          <Title>Trending Catagories</Title>
          <List>
            <ListItem>Books</ListItem>
            <ListItem>Semester Notes</ListItem>
            <ListItem>Fans</ListItem>
            <ListItem>Coolers</ListItem>
            <ListItem>Table Lamp</ListItem>
            <ListItem>Sports Equipments</ListItem>
            <ListItem>Decor</ListItem>
            <ListItem>Lights</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> USICT, Dwarka, Delhi
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +91 9898473896
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> ipuConnect@ipu.ac.in
          </ContactItem>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <WhatsApp />
            </SocialIcon>
          </SocialContainer>
        </Right>
      </Container>
      </div>
    );
  };
  
  export default Footer;