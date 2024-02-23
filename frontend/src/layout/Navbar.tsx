
import styled from 'styled-components'
import LogoImg from "../assets/logo2.png"
import ButtonComponent from './StyledButton'
import { Link } from 'react-router-dom'

const Section = styled.section`
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`

const Links = styled.div`
    display: flex;
    align-items: center;
    gap:50px;
`

const Logo = styled.img`
    height: 80px;
`
const List = styled.ul`
    display: flex;
    gap:20px;
    list-style: none;
`
const ListItem = styled(Link)`
    cursor: pointer;
    color: white;
    text-decoration: none;
`


const Navbar = () => {
  return (
    <Section>
        <Container>
            <Links>
                <Logo src={LogoImg}/>
                <List>
                    <ListItem to="/">Strona głowna</ListItem>
                    <ListItem to="/games">Gry</ListItem>
                    <ListItem to="/gamedevs">Twórcy</ListItem>
                    <ListItem to="/stores">Sklepy</ListItem>
                    <ListItem to="/contact">Kontakt</ListItem>
                </List>
            </Links>
            <ListItem to="/login"><ButtonComponent title="Zaloguj się" /></ListItem>
            
        </Container>
    </Section>
  )
}

export default Navbar