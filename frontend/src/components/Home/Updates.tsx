import styled from 'styled-components'
import Typography from '@mui/material/Typography';
import CardComponent from './layout/Card'


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



const Updates = () => {

  const listOfNews = [
    {title: "one", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "two", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "three", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "four", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "five", teaser:"loremloremloremloremloremloremloremloremlorem"},
    {title: "six", teaser:"loremloremloremloremloremloremloremloremlorem"},
  ]
  return (
    <Section>
      <Typography gutterBottom variant="h3" component="h1" color="white">
          Aktualności
      </Typography>
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