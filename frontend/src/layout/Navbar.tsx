import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import styled from 'styled-components';
import ButtonComponent from './StyledButton';
import LogoImg from '../assets/logo2.png';
import { motion } from 'framer-motion';

interface SectionProps {
  scrolled?: boolean;
}

interface NavLinkProps {
  activeClassName: string;
}

interface SideBarProps {
  isOpen: boolean;
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
  padding: 10px 50px;
  height: 100px;

  @media (max-width: 768px) {
    width: 100%; 
    height: 50px;
    padding: 10px 20px; 
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media (max-width: 768px) {
    display: none;
  }
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

const LoginButton = styled(NavLink)<SideBarProps>`
  cursor: pointer;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all ease .2s;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const LogoutButton = styled(ButtonComponent)<SideBarProps>`
  cursor: pointer;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all ease .2s;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const HamburgerIcon = styled.div`
  display: none; 
  cursor: pointer;
  z-index: 3000;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;

const SideBar = styled(motion.div)<SideBarProps>`
  height: 100vh;
  width: 100%;
  background-color: #580537dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2999;
  transition: transform 0.3s ease; 
  transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 90%;
`;


const Navbar = () => {
  const { currentUser, handleLogout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  

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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Section scrolled={scrolled}>
        <Container>
          <Links>
            <Logo src={LogoImg} />
            <List>
              <ListItem to="/" activeClassName="active">
                Home
              </ListItem>
              <ListItem to="/games" activeClassName="active">
                Games
              </ListItem>
              <ListItem to="/gamedevs" activeClassName="active">
                Creators
              </ListItem>
              <ListItem to="/stores" activeClassName="active">
                Stores
              </ListItem>
              <ListItem to="/contact" activeClassName="active">
                Contact
              </ListItem>
            </List>
          </Links>
          <HamburgerIcon onClick={toggleMenu}>☰</HamburgerIcon>
          
          {!currentUser ? (
            !isSmallScreen && (<LoginButton isOpen={isMenuOpen} to="/login">
              <ButtonComponent title="Sign in" />
            </LoginButton>)
          ) : (
            !isSmallScreen &&<LogoutButton isOpen={isMenuOpen} onClick={() => handleLogout()} title="Logout" />
          )}
        </Container>
      </Section>
      {isMenuOpen && (
        <SideBar  isOpen={isMenuOpen}
        initial={{width: isMenuOpen ? "0%" : "100%"}}
        animate={{ width: isMenuOpen ? "100%" : 0 }}
       >
          <HamburgerIcon onClick={toggleMenu}>☰</HamburgerIcon>
          <SidebarList>
            <ListItem to="/" activeClassName="active">
              Home
            </ListItem>
            <ListItem to="/games" activeClassName="active">
              Games
            </ListItem>
            <ListItem to="/gamedevs" activeClassName="active">
              Creators
            </ListItem>
            <ListItem to="/stores" activeClassName="active">
              Stores
            </ListItem>
            <ListItem to="/contact" activeClassName="active">
              Contact
            </ListItem>
          </SidebarList>
          {!currentUser ? (
            <LoginButton to="/login" isOpen={isMenuOpen}>
              <ButtonComponent title="Sign in" />
            </LoginButton>
          ) : (
            <LogoutButton isOpen={isMenuOpen} onClick={() => handleLogout()} title="Logout" />
          )}
        </SideBar>
      )}
    </>
  );
};


export default Navbar;
