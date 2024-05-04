import { useState, useEffect } from 'react';
import {  NavLink,  } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import styled from 'styled-components';
import ButtonComponent from './StyledButton';
import LogoImg from '../assets/logo2.png';

interface SectionProps {
  scrolled: boolean;
}

interface NavLinkProps {
    activeClassName: string;
}

const Section = styled.section<SectionProps>`
  display: flex;
  justify-content: center;
  position: sticky;
  top: ${props => (props.scrolled ? '0' : '-80px')};
  left: 0;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(31, 3, 61, ${props => (props.scrolled ? '0.9' : '0')}),
    rgba(63, 19, 82, ${props => (props.scrolled ? '0.9' : '0')}),
    rgba(54, 0, 51, ${props => (props.scrolled ? '0.9' : '0')})
  );
  z-index: 1000;
  transition: top 0.3s;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Logo = styled.img`
  height: 80px;
`;

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;



const ListItem = styled(NavLink)<NavLinkProps>`
  cursor: pointer;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all ease .2s;

  &.${(props:{activeClassName:string}) => props.activeClassName} {
    background-color: #870252; 
  }

  &:hover {
    background-color: #870252; 
  }
`;

const LoginButton = styled(NavLink)`
  cursor: pointer;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all ease .2s;


`;


const Navbar = () => {
    const { currentUser, handleLogout } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 80;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrolled]);
  
    return (
      <Section scrolled={scrolled}>
        <Container>
          <Links>
            <Logo src={LogoImg} />
            <List>
              <ListItem
                to="/"
                activeClassName="active"
              >
                Home
              </ListItem>
              <ListItem
                to="/games"
                activeClassName="active"
              >
                Games
              </ListItem>
              <ListItem
                to="/gamedevs"
                activeClassName="active"
              >
                Creators
              </ListItem>
              <ListItem
                to="/stores"
                activeClassName="active"
              >
                Stores
              </ListItem>
              <ListItem
                to="/contact"
                activeClassName="active"
              >
                Contact
              </ListItem>
            </List>
          </Links>
          {!currentUser ? (
            <LoginButton to="/login">
              <ButtonComponent title="Sign in" />
            </LoginButton>
          ) : (
            <ButtonComponent onClick={() => handleLogout()} title="Logout" />
          )}
        </Container>
      </Section>
    );
  };

export default Navbar;