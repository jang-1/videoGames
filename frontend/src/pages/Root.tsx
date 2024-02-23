import {Outlet} from "react-router-dom"
import styled from "styled-components"
// import Bg from '../assets/bg2.jpg'
import Header from "../layout/Header"
import Footer from "../layout/Footer"

const Container = styled.div`
    height: 100vh;
    background: linear-gradient(to right, #1f033d, #3f1352, #360033);
    /* scroll-snap-type: y mandatory;
    scroll-behavior: smooth; */
    overflow-y: auto;
    color: white;
`


const RootLayout = () => {
    return(
        <Container>
            <Header/>
            <Outlet />
            <Footer/>
        </Container>
    )
}

export default RootLayout