import { Typography } from '@mui/material'
import styled from 'styled-components'
import axios, { API_KEY } from '../api/axiosCreate'
import { useQuery } from '@tanstack/react-query'
import CardComponent from '../components/Developers/Card'
import CreatorsCard from '../components/Games/CreatorsCard'

const Section = styled.section`
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:30px;
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap:30px;
`
const CreatorsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap:150px;
    margin-top: 100px;
`

const CardWrapper = styled.div`
    width: 30%;
    display: flex;
    justify-content:center;
    align-items: center;
`




const Developers = () => {
    const { data:gameDevsList } = useQuery({
        queryKey: ['gameDevs'],
        queryFn: () => axios.get(`/developers?${API_KEY}`),
      })

      console.log(gameDevsList)
    const gameDevs = gameDevsList?.data?.results

    const { data:gameCreatorsList } = useQuery({
        queryKey: ['gameCreators'],
        queryFn: () => axios.get(`/creators?${API_KEY}`),
      })

      const gameCreators = gameCreatorsList?.data?.results

      console.log(gameCreatorsList)
      return (
        <Section>
          <Typography gutterBottom variant="h3" component="h1" color="white">
              Twórcy gier
          </Typography>
          <Wrapper>
            {gameDevs?.map(({id, name, games_count, image_background}:any) => (
                <CardWrapper key={id}>
                  <CardComponent name={name} games_count={games_count} image={image_background}/>
                </CardWrapper>
            ))}
          </Wrapper>
          <Typography gutterBottom variant="h3" component="h1" color="white">
              Twórcy gier
          </Typography>
          <CreatorsWrapper>
            {gameCreators?.map(({id, name, games_count, image}:any) => (
                <CardWrapper key={id}>
                  <CreatorsCard name={name} games_count={games_count} image={image}/>
                </CardWrapper>
            ))}
          </CreatorsWrapper>
        </Section>
      )
}

export default Developers