import { useState } from 'react';
import { Skeleton, Typography } from '@mui/material';
import styled from 'styled-components';
import CardComponent from '../components/Games/Card';
import StyledButton from '../layout/StyledButton';
import { motion } from 'framer-motion';
import RawgLink from '../layout/RawgLink';
import { useGames } from '../hooks/useGames';
import Pagination from '../layout/Pagination';

const Section = styled.section`
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap:30px;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
        justify-content: center
  }
`;

const CardWrapper = styled(motion.div)`
    width: 505px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GenresWrapper = styled.div`
    width: 10%;
    display: flex;
    gap:15px;
    flex-direction: column;

    @media (max-width: 768px) {
    display: none;
  }
`;

const GamesWrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    row-gap:50px;
    flex-wrap: wrap;
    min-height: 1000px;

    @media (max-width: 768px) {
        width:100%;
        justify-content: center;
  }
`;



const SearchWrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    gap:10px;

    @media (max-width: 768px) {
        width:100%;
  }
`;

const SearchInput = styled.input`
    width: 70%;
    padding: 10px;
    height: 50px;
    font-size: 16px;
`;

const SearchButton = styled(StyledButton)`
`;

const Games = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    const {games, genres, isLoading, refetch} = useGames(undefined, currentPage, selectedGenre, searchTerm)

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

    const handleGenreClick = (genreId: any) => {
        setSelectedGenre(genreId === 0 ? null : genreId);
        setCurrentPage(1);
        refetch();
    };

    const handleSearchChange = (event:any) => {
        setSearchTerm(event.target.value);
    };


    const handleSearchClick = () => {
        setCurrentPage(1)
        refetch()
    };

    const hasMorePages = games?.length === 9;

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const skeletonArray = new Array(9).fill(null); 

    return (
        <Section>
            <Typography gutterBottom variant="h3" component="h1" color="white">
                Games
            </Typography>
            <RawgLink/>
            <Wrapper>
                <GenresWrapper>   
                    <StyledButton
                        sx={{ margin: "0 0 0 10px" }}
                        fsize={18}
                        title={"All"}
                        onClick={() => handleGenreClick(0)} 
                        isActive={selectedGenre === null} 
                    />
                    {genres?.map((g:any) => (
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
                <GamesWrapper>
                    <SearchWrapper>
                        
                        <SearchInput
                            type="text"
                            placeholder="Search games..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            />
                        <SearchButton onClick={handleSearchClick} title="Search" />
                    </SearchWrapper>
                    {isLoading ? (
                        skeletonArray.map((_, index) => (
                            <CardWrapper key={index}>
                                <Skeleton variant="rectangular" width={345} height={325} />
                            </CardWrapper>
                        ))
                    ): (
                        games?.map(({ id, name, released, rating, background_image }: any) => (
                            <CardWrapper
                                key={name}
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                layout
                                whileHover={{scale:1.1}}
                            >
                                <CardComponent id={id} name={name} release={released} rating={rating} image={background_image} />
                            </CardWrapper>
                        ))
                    )}
                </GamesWrapper>
            </Wrapper>
            <Pagination currentPage={currentPage} hasMorePages={hasMorePages} nextPage={nextPage} prevPage={prevPage}/>
        </Section>
    );
};

export default Games;
