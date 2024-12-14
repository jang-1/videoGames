import {Outlet} from "react-router-dom"
import styled from "styled-components"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import useScrollToTop from "../hooks/useScrollToTop"

const Container = styled.div`
    background: linear-gradient(to right, #1f033d, #3f1352, #360033);
    color: white;
`


const RootLayout = () => {
    useScrollToTop();
    return(
        <Container>
            <Header/>
            <Outlet />
            <Footer/>
        </Container>
    )
}

export default RootLayout