import { Box, CircularProgress, Typography } from '@mui/material'
import styled from 'styled-components'
import CardComponent from '../components/Games/Card'
import { useQuery } from '@tanstack/react-query'
import axios, { API_KEY } from '../api/axiosCreate'
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
`

const CardWrapper = styled.div`
    width: 30%;
    display: flex;
    justify-content:center;
    align-items: center;
`

const GenresWrapper = styled.div`
    width: 10%;
    display: flex;
    gap:15px;
    flex-direction: column;
`
const GamesWrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    row-gap:50px;
    flex-wrap: wrap;
`
const ButtonWrapper = styled.div`
    width: 90%;
    align-self: flex-end;
    display: flex;
    justify-content: space-evenly;
    margin: 50px 0;
`

const Games = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const { data:genresList } = useQuery({
        queryKey: ['genres'],
        queryFn: () => axios.get(`/genres?${API_KEY}`),
      })
    const genres = genresList?.data.results


    const { data: gameList, isLoading ,refetch } = useQuery({
        queryKey: ['games', currentPage, selectedGenre], 
        queryFn: () => {
            const genreQuery = selectedGenre ? `&genres=${selectedGenre}` : '';
            return axios.get(`/games?${API_KEY}&page=${currentPage}&page_size=9${genreQuery}`);
        },
    });
    const games = gameList?.data.results;

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

    const handleGenreClick = (genreId:any) => {
        setSelectedGenre(genreId === 0 ? null : genreId);
        setCurrentPage(1);
        refetch();
    };
    


    return (
        <Section>
            <Typography gutterBottom variant="h3" component="h1" color="white">
                Gry
            </Typography>
            <Wrapper>
                <GenresWrapper>
                        <StyledButton
                            
                            sx={{ margin: "0 0 0 10px" }}
                            fsize={18}
                            title={"All"}
                            onClick={() => handleGenreClick(0)} 
                            isActive={selectedGenre === null} 
                        />
                    {genres?.map((g: any) => (
                        <StyledButton
                            key={g.name}
                            sx={{ margin: "0 0 0 10px" }}
                            fsize={18}
                            title={g.name}
                            onClick={() => handleGenreClick(g.id)} 
                            isActive={selectedGenre === g.id} 
                        />
                    ))}
                </GenresWrapper>
                {isLoading ? <CircularProgress /> :
                <GamesWrapper>
                    {games?.map(({id, name, released, rating, background_image }: any) => (
                        <CardWrapper key={name}>
                            <CardComponent id={id} name={name} release={released} rating={rating} image={background_image} />
                        </CardWrapper>
                    ))}
                </GamesWrapper>}
            </Wrapper>
            <ButtonWrapper>
                <StyledButton onClick={prevPage} title="Poprzednia" />
                <StyledButton onClick={nextPage} title="Następna" />
            </ButtonWrapper>
        </Section>
    );
};

export default Games;