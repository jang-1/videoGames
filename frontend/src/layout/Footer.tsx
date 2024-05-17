import { Link } from "react-router-dom"
import LineImg from "../assets/line.png"
import Fb from "../assets/fb.svg"
import Linkedin from "../assets/linkedin.svg"
import Instagram from "../assets/ins.svg"
import Logo from '../assets/logo2.png'
import styled from 'styled-components'

const Container = styled.footer`
    width: 100%;
    display: flex;
    height: 30vh;
    scroll-snap-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;

    @media (max-width: 768px) {
        height:fit-content
    }
`

const Wrapper = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        gap:30px
    }
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    @media (max-width: 768px) {
        flex-direction:row;
        width: 100%;
    }
`

const Right = styled.div`
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: space-between;
    height: 200px;

    @media (max-width: 768px) {
        width:100%
    }
`

const Img = styled.img`
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Line = styled.img`
    height: 5px;
`;

const Subtitle = styled.h2`
    color: #da4ea2;
    font-size: 14px;
`;

const NavContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap:5px;
`;

const ListItem = styled(Link)`
    cursor: pointer;
    color: white;
    text-decoration: none;

    &:hover {
        color: #da4ea2;
    }
`

const Item = styled.li`
    cursor: pointer;
    color: white;
    text-decoration: none;
    list-style-type: none;

    &:hover {
        color: #da4ea2;
    }
`

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
`

const Title = styled.h3`
    display: flex;
    align-self:flex-start;
`
const MediaImg = styled.img`
    width: 50px;
    padding: 10px 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

`


const Footer = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Img src={Logo} alt="logo" />
                <Info>
                    <Line src={LineImg}></Line>
                    <Subtitle>News, rankings, creators and much more!</Subtitle>
                </Info>
            </Left>
            <Right>
                <StyledBox>
                    <Title>Menu</Title>
                    <NavContainer>
                        <ListItem to="/">Home</ListItem>
                        <ListItem to="/games">Games</ListItem>
                        <ListItem to="/gamedevs">Creators</ListItem>
                        <ListItem to="/stores">Shop</ListItem>
                        <ListItem to="/contact">Contact</ListItem>
                    </NavContainer>
                </StyledBox>

                <StyledBox>
                    <Title>Contact</Title>
                    <NavContainer>
                        <Item>123456789</Item>
                        <Item>test@test.com</Item>
                        <Item>Testowa 34, Kraków</Item>
                    </NavContainer>
                </StyledBox>

                <StyledBox>
                    <Title>Media</Title>
                    <NavContainer>
                        <Item><MediaImg  src={Fb} alt="" /></Item>
                        <Item><MediaImg src={Linkedin} alt="" /></Item>
                        <Item><MediaImg src={Instagram} alt="" /></Item>
                    </NavContainer>
                </StyledBox>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Footer