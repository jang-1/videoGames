import { Skeleton, Typography } from '@mui/material'
import styled from 'styled-components'
import CardComponent from '../components/Developers/Card'
import CreatorsCard from '../components/Games/CreatorsCard'
import { useState } from 'react'
import StyledButton from '../layout/StyledButton'
import { motion } from 'framer-motion'
import RawgLink from '../layout/RawgLink'
import { useCreators } from '../hooks/useCreators'

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
    min-height: 1000px;

`
const CreatorsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap:150px;
    margin-top: 100px;
    min-height: 1000px;
`

const CardWrapper = styled(motion.div)`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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

  const {gameDevs, gameCreators, refetch, isLoading, refetchCreators, isLoadingCreators} = useCreators(undefined, currentPage, currentCreatorPage)


  const skeletonArray = new Array(9).fill(null); 


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
    refetchCreators();
};

const prevPageCreators = () => {
    if (currentCreatorPage > 1) {
      setCurrentCreatorPage((prevPage) => prevPage - 1);
      refetchCreators();
    }
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

return (
  <Section>
      <Typography gutterBottom variant="h3" component="h1" color="white">
          Game Developers
      </Typography>
      <RawgLink/>

        <Wrapper>
                {isLoading ? (
                    skeletonArray.map((_, index) => (
                      <CardWrapper key={index}>
                        <Skeleton variant="rectangular" width={345} height={325} />
                      </CardWrapper>
                    ))
                  ): (
                  <>
                    {gameDevs?.map(({ id, name, games_count, image_background }:any) => (
                      <CardWrapper
                      key={id}
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{scale:1.1}}
                  >
                      <CardComponent id={id} name={name} games_count={games_count} image={image_background} />
                  </CardWrapper>
                    ))}
                  </>
                )}
      </Wrapper>
      <ButtonWrapper>
          {currentPage > 1 && (
              <StyledButton onClick={prevPage} title="Previous" />
          )}
          {gameDevs && gameDevs.length === 9 && (
              <StyledButton onClick={nextPage} title="Next" />
          )}
      </ButtonWrapper>
      <Typography gutterBottom variant="h3" component="h1" color="white">
          Game Creators
      </Typography>
      <CreatorsWrapper>
                {isLoadingCreators ? (
                    skeletonArray.map((_, index) => (
                      <CardWrapper key={index}>
                        <Skeleton variant="rectangular" width={345} height={345} />
                      </CardWrapper>
                    ))
                  ): (
                  <> 
                    {gameCreators?.map(({id, name, games_count, image}:any) => (
                        <CardWrapper
                            key={id}
                            variants={fadeInVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{scale:1.1}}
                        >
                            <CreatorsCard id={id} name={name} games_count={games_count} image={image} />
                        </CardWrapper>
                    ))}
                  </>
                )}
      
      </CreatorsWrapper>
      <ButtonWrapper>
          {currentCreatorPage > 1 && (
              <StyledButton onClick={prevPageCreators} title="Previous" />
          )}
          {gameCreators && gameCreators.length === 9 && (
              <StyledButton onClick={nextPageCreators} title="Next" />
          )}
      </ButtonWrapper>
  </Section>
);
}

export default Developers