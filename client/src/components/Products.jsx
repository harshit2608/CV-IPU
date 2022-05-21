import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';

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
    return (
        <Container>
            <Title>Top Products</Title>
            {popularProducts.map((item) => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Products;
