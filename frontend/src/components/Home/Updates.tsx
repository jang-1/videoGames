import styled from 'styled-components'
import Typography from '@mui/material/Typography';
import CardComponent from './layout/Card'
import StyledButton from '../../layout/StyledButton';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import StyledLink from '../../layout/StyledLink';


const Section = styled.section`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:30px;
`
const Wrapper = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    gap:50px;
    flex-wrap: wrap;
`

const CardWrapper = styled.div`
    width: 30%;
    display: flex;
    justify-content:center;
    align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1; /* occupy remaining space */
`

const BContainer = styled.div`
  align-self: flex-end; /* move the button to the right */
  margin-right: 10px;
`



const Updates = () => {

  const listOfNews = [
    {title: "one", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "two", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "three", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "four", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "five", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "six", teaser:"loremloremloremloremloremloremloremloremlorem"},
  ]

  const {currentUser}:any = useContext(AuthContext)
  return (
    <Section>
      <ButtonContainer>

      <TitleContainer>
          <Typography gutterBottom variant="h3" component="h1" color="white">
              Aktualności
          </Typography>
        </TitleContainer>
        {currentUser?.role === "admin" &&
          <BContainer>
            <StyledLink to="/addnews" title="Add news" fsize={20}/>
          </BContainer>
        }
      </ButtonContainer>
      <Wrapper>
        {listOfNews.map(({title, teaser}) => (
            <CardWrapper>
              <CardComponent title={title} teaser={teaser}/>
            </CardWrapper>
        ))}
      </Wrapper>
    </Section>
  )
}

export default Updates