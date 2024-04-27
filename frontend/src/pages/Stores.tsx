import { Typography, Skeleton } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';
import StyledButton from '../layout/StyledButton';
import { motion } from 'framer-motion';
import StoreCard from '../components/Stores/StoreCard';
import RawgLink from '../layout/RawgLink';
import { useStores } from '../hooks/useStores';

const Section = styled.section`
    scroll-snap-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
`;

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
                            <StoreCard id={id} name={name} games_count={games_count} image={image_background} />
                        </CardWrapper>
                    ))
                )}
            </Wrapper>
            <ButtonWrapper>
                {currentPage > 1 && (
                  <StyledButton onClick={prevPage} title="Previous" />
                )}
                {stores && stores.length === 9 && (
                <StyledButton onClick={nextPage} title="Next" />
                )}
            </ButtonWrapper>
        </Section>
    );
};

export default Stores;
