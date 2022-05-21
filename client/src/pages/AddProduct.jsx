import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.0),
      rgba(255, 255, 255, 0.0)
    ),
    url("https://www.dropbox.com/s/i1j9scblsigcw0w/148c3fea-c63f-4070-a485-9ffa4416d6ec.jpg?dl=1")
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
  font-weight: bolder;
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

const ButtonWrapper =styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  opacity: 1;
  width: 100%;
`
const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  return (
    <div>
    <Navbar/>
    <Container>
      <Wrapper>
        <Title>Add Product</Title>
        <Form>
          <Input type="text" placeholder="product name" />
          <Input type="text" placeholder="price in INR" />
          <Input type="text" placeholder="description" />
          <Input type="number" placeholder="quantity" />
          <Input type="file" placeholder="Add image" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonWrapper>
            <Button>CREATE</Button>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </Container>
      <Footer/>
    </div>
  );
};

export default Register;