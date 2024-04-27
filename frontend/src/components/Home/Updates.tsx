import React, { useContext } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import CardComponent from './layout/Card';
import { AuthContext } from '../../context/authContext';
import { usePosts } from '../../hooks/usePosts';
import StyledLink from '../../layout/StyledLink';
import { motion } from 'framer-motion';

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
    gap: 50px;
    flex-wrap: wrap;
`;

const CardWrapper = styled(motion.div)`
    width: 345px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #740343;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Updates: React.FC = () => {
    const { fetchedPosts } = usePosts();
    const posts = fetchedPosts?.data;

    const {currentUser} = useContext(AuthContext);

    return (
        <Section>
            <TitleContainer>
                <Typography variant="h3" component="h1" color="white">
                    News
                </Typography>
                {currentUser?.role === 'admin' && (
                    <StyledLink to="/addnews" title="Add news" fsize={20} />
                )}
            </TitleContainer>
            <Wrapper>
                {posts?.map(({ id, title, desc, img }: any) => (
                    <CardWrapper key={id} whileHover={{ scale: 1.1 }}>
                        <CardComponent id={id} title={title} desc={desc} img={`public/upload/${img}`} />
                    </CardWrapper>
                ))}
            </Wrapper>
        </Section>
    );
};

export default Updates;