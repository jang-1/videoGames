import { Typography, Skeleton } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';
import { motion } from 'framer-motion';
import RawgLink from '../layout/RawgLink';
import { useStores } from '../hooks/useStores';
import Pagination from '../layout/Pagination';
import CardComponent from '../components/CardComponent/CardComponent';

const Section = styled.section`
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;

const Wrapper = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;

    @media (max-width: 768px) {
        justify-content: center;
  }
`;

const CardWrapper = styled(motion.div)`
    width: 345px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const Stores = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { stores, refetch, isLoading } = useStores(undefined, currentPage)

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

    const skeletonArray = new Array(9).fill(null); 

    return (
        <Section>
            <Typography gutterBottom variant="h3" component="h1" color="white">
               Stores
            </Typography>
            <RawgLink/>
            <Wrapper>
            {isLoading ? (
                    skeletonArray.map((_, index) => (
                      <CardWrapper key={index}>
                        <Skeleton variant="rectangular" width={345} height={325} />
                      </CardWrapper>
                    ))
                  ):(
                    stores?.map(({ id, name, games_count, image_background }:any) => (
                        <CardWrapper
                            key={id}
                            whileHover={{scale:1.1}}
                        >
                            <CardComponent id={id} name={name} games_count={games_count} image={image_background} linkBasePath="stores" />
                        </CardWrapper>
                    ))
                )}
            </Wrapper>
            <Pagination currentPage={currentPage} hasMorePages={stores?.length === 9} nextPage={nextPage} prevPage={prevPage}/>
        </Section>
    );
};

export default Stores;
