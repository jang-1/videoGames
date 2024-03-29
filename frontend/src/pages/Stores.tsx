import { Typography } from '@mui/material'
import styled from 'styled-components'
import axios, { API_KEY } from '../api/axiosCreate'
import { useQuery } from '@tanstack/react-query'
import CardComponent from '../components/Developers/Card'
import { useState } from 'react'
import StoreCard from '../components/Stores/StoreCard'
import StyledButton from '../layout/StyledButton'

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

const ButtonWrapper = styled.div`
    width: 100%;
    align-self: flex-end;
    display: flex;
    justify-content: space-evenly;
    margin: 50px 0;
`


const Stores = () => {
  const [currentPage, setCurrentPage] = useState(1);

    const { data:storeList, refetch } = useQuery({
      queryKey: ['stores', currentPage],
      queryFn: () => axios.get(`/stores?${API_KEY}&page=${currentPage}&page_size=9`),
    })
  
    const stores = storeList?.data?.results
  
    console.log(storeList)
  
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        refetch();
    };
  
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            refetch();
        }
    };

      return (
        <Section>
          <Typography gutterBottom variant="h3" component="h1" color="white">
              Sklepy(Stores)
          </Typography>
          <Wrapper>
            {stores?.map(({id, name, games_count, image_background}:any) => (
                <CardWrapper key={id}>
                  <StoreCard id={id} name={name} games_count={games_count} image={image_background}/>
                </CardWrapper>
            ))}
          </Wrapper>
          <ButtonWrapper>
                <StyledButton onClick={prevPage} title="Poprzednia" />
                <StyledButton onClick={nextPage} title="Następna" />
          </ButtonWrapper>
        </Section>
      )
}

export default Stores