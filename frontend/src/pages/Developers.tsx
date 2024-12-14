import { Skeleton, Typography } from '@mui/material'
import styled from 'styled-components'
import CardComponent from '../components/CardComponent/CardComponent'
import CreatorsCard from '../components/Creators/CreatorsCard'
import { useState } from 'react'
import { motion } from 'framer-motion'
import RawgLink from '../layout/RawgLink'
import { useCreators } from '../hooks/useCreators'
import Pagination from '../layout/Pagination'

type GameDevs = {
  id:number
  name:string
  games_count:number; 
  image_background: string 
}

type GameCreators = Omit<GameDevs, "image_background"> & {
  image:string
}

const Section = styled.section`
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
    flex-wrap: wrap;
    gap:30px;
    min-height: 1000px;

    @media (max-width: 768px) {
        justify-content: center;
  }

`
const CreatorsWrapper = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap:30px;
    row-gap:150px;
    margin-top: 100px;
    min-height: 1000px;

    @media (max-width: 768px) {
        justify-content: center;
  }
`

const CardWrapper = styled(motion.div)`
    width: 345px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


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
                    {gameDevs?.map(({ id, name, games_count, image_background }:GameDevs) => (
                      <CardWrapper
                        key={id}
                        variants={fadeInVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{scale:1.1}}
                  >
                      <CardComponent id={id} name={name} games_count={games_count} image={image_background} linkBasePath="developers" />
                  </CardWrapper>
                    ))}
                  </>
                )}
      </Wrapper>
      <Pagination currentPage={currentPage} hasMorePages={gameDevs?.length === 9} nextPage={nextPage} prevPage={prevPage}/>
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
                    {gameCreators?.map(({id, name, games_count, image}:GameCreators) => (
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
      <Pagination currentPage={currentCreatorPage} hasMorePages={gameCreators?.length === 9} nextPage={nextPageCreators} prevPage={prevPageCreators}/>
  </Section>
);
}

export default Developers