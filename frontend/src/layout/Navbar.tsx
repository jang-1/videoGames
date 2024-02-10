
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
                    <ListItem to="/">Gry</ListItem>
                    <ListItem to="/">Twórcy</ListItem>
                    <ListItem to="/">Sklepy</ListItem>
                    <ListItem to="/">Kontakt</ListItem>
                </List>
            </Links>
            <ListItem to="/login"><ButtonComponent title="Zaloguj się" color="#da4ea2"/></ListItem>
            
        </Container>
    </Section>
  )
}

export default Navbar