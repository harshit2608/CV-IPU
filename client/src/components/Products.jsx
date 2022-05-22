import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Title = styled.div`
    text-align: center;
    width: 100%;
    font-weight: bold;
    justify-content: center;
    font-size: 28px;
    color: black;
    opacity: 0.5;
    margin: 80px 20px 20px 20px;
`;



const Products = () => {

    const [AllProducts, setProducts] = useState([])

    const fetchProducts = () => {
        axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=f357ffc056fc4354bf4be0d650aa370c")
            .then((response) => {
                setProducts(response.data.articles)
            })
    }

    return (

        <Container onClick={fetchProducts}>
            <Title>Top Products</Title>
            {AllProducts.map((item) => (
                <Product item={item} />
            ))}
        </Container>
    );
};

export default Products;

