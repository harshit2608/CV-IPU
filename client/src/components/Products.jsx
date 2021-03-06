import styled from 'styled-components';
import Product from './Product';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config';
import Button from 'react-bootstrap/Button';
import { popularProducts } from '../data';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 100px;
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
    const [AllProducts, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            await axios
                .post(
                    // 'https://newsapi.org/v2/top-headlines?country=us&apiKey=f357ffc056fc4354bf4be0d650aa370c'
                    `${ENDPOINT}/api/v1/product/getProducts`
                )
                .then((response) => {
                    // console.log(response.data.data.products);
                    setProducts(response.data.data.products);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        // <Container onClick={fetchProducts}>
        <Container>
            <Title>Top Products</Title>
            {AllProducts.map((item) => (
                <Product item={item} />
            ))}
        </Container>
    );
};

export default Products;
