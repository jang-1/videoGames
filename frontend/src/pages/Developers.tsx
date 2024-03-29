import { Typography } from '@mui/material'
import styled from 'styled-components'
import axios, { API_KEY } from '../api/axiosCreate'
import { useQuery } from '@tanstack/react-query'
import CardComponent from '../components/Developers/Card'
import CreatorsCard from '../components/Games/CreatorsCard'
import { useState } from 'react'
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

const ButtonWrapper = styled.div`
    width: 100%;
    align-self: flex-end;
    display: flex;
    justify-content: space-evenly;
    margin: 50px 0;
`


const Developers = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCreatorPage, setCurrentCreatorPage] = useState(1);


    const { data: gameDevsList, refetch } = useQuery({
      queryKey: ['gameDevs', currentPage], 
      queryFn: () => {
          return axios.get(`/developers?${API_KEY}&page=${currentPage}&page_size=9`);
      },
  });
  console.log(gameDevsList)
  const gameDevs = gameDevsList?.data.results;


  const { data:gameCreatorsList, refetch:rf } = useQuery({
    queryKey: ['gameCreators', currentCreatorPage],
    queryFn: () => axios.get(`/creators?${API_KEY}&page=${currentCreatorPage}&page_size=9`),
  })

  const gameCreators = gameCreatorsList?.data?.results

  console.log(gameCreatorsList)

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

  const nextPageCreators = () => {
    setCurrentCreatorPage((prevPage) => prevPage + 1);
    rf();
};

const prevPageCreators = () => {
    if (currentPage > 1) {
      setCurrentCreatorPage((prevPage) => prevPage - 1);
        rf();
    }
};


      return (
        <Section>
          <Typography gutterBottom variant="h3" component="h1" color="white">
              Twórcy gier
          </Typography>
          <Wrapper>
            {gameDevs?.map(({id, name, games_count, image_background}:any) => (
                <CardWrapper key={id}>
                  <CardComponent id={id} name={name} games_count={games_count} image={image_background}/>
                </CardWrapper>
            ))}
          </Wrapper>
            <ButtonWrapper>
                <StyledButton onClick={prevPage} title="Poprzednia" />
                <StyledButton onClick={nextPage} title="Następna" />
            </ButtonWrapper>
          <Typography gutterBottom variant="h3" component="h1" color="white">
              Twórcy gier
          </Typography>
          <CreatorsWrapper>
            {gameCreators?.map(({id, name, games_count, image}:any) => (
                <CardWrapper key={id}>
                  <CreatorsCard id={id} name={name} games_count={games_count} image={image}/>
                </CardWrapper>
            ))}
          </CreatorsWrapper>
          <ButtonWrapper>
                <StyledButton onClick={prevPageCreators} title="Poprzednia" />
                <StyledButton onClick={nextPageCreators} title="Następna" />
            </ButtonWrapper>
        </Section>
      )
}

export default Developers