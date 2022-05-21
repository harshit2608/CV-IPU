import styled from "styled-components";
import React from 'react'
import { Announcements } from '../components/Announcements'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Footer from '../components/Footer'
import Slider  from '../components/Slider'

const Container = styled.div`
    background-color: #FFFFFF;
`

export default function Home() {
    return (
        <Container>
        {/* <Announcements/> */}
            <Navbar/>
            <Slider/>
            <Products/>
            <Footer/>
        </Container>
    )
}
