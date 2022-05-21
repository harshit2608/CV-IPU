import styled from "styled-components"
import React from 'react'

const Container = styled.div`
    height : 20px;
    background-color : #9772FB;
    color : white;
    text-align : center;
    font-weight : 500;
    font-size : 14px;
    justify-content : center;
    display : flex;
`

export const Announcements = () => {
    return (
        <Container>
            {/* <marquee >Top Donor of the month is - Sachin from USICT</marquee> */}
            Top Donor of the month is - Sachin from USICT
        </Container>
    )
}
