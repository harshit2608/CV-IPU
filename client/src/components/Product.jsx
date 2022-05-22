import {
    ChatBubbleOutline,
    FavoriteBorderOutlined,
    ShoppingCartOutlined,
} from '@material-ui/icons';
import styled from 'styled-components';

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
    border-radius: 2%;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    max-width: 280px;
    max-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    border-radius: 10px;

    &:hover ${Info} {
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

const Image = styled.img`
    max-height: 320px;
    max-width: 250px;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    opacity: 0.7;
    &:hover {
        background-color: #e9f5f5;
        opacity: 1;
        transform: scale(1.2);
    }
`;

const ProductInfo = styled.div`
    text-align: center;
    font-size: 16px;
    
`

const Product = ({ item }) => {
    return (
        <div>
            <Container>
                {/* <Circle /> */}
                <Image src={item.urlToImage} />
                <Info>
                    <Icon>
                        <ShoppingCartOutlined />
                    </Icon>
                    <Icon>
                        <ChatBubbleOutline />
                    </Icon>
                    <Icon>
                        <FavoriteBorderOutlined />
                    </Icon>
                </Info>

            </Container>
            <ProductInfo>
                <h3>{item.author} </h3>
                <h3>Price: </h3>
            </ProductInfo>

        </div>
    );
};

export default Product;
