import { Typography } from '@mui/material'
import styled from 'styled-components'
import axios, { API_KEY } from '../api/axiosCreate'
import { useQuery } from '@tanstack/react-query'
import CardComponent from '../components/Developers/Card'

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

const CardWrapper = styled.div`
    width: 30%;
    display: flex;
    justify-content:center;
    align-items: center;
`




const Stores = () => {
    const { data:storeList } = useQuery({
        queryKey: ['stores'],
        queryFn: () => axios.get(`/stores?${API_KEY}`),
      })

      console.log(storeList)
    const stores = storeList?.data?.results
      return (
        <Section>
          <Typography gutterBottom variant="h3" component="h1" color="white">
              Sklepy(Stores)
          </Typography>
          <Wrapper>
            {stores?.map(({id, name, games_count, image_background}:any) => (
                <CardWrapper key={id}>
                  <CardComponent name={name} games_count={games_count} image={image_background}/>
                </CardWrapper>
            ))}
          </Wrapper>
        </Section>
      )
}

export default Stores