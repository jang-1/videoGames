import React, {  useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import CardComponent from './layout/Card';
import { usePosts } from '../../hooks/usePosts';
import StyledLink from '../../layout/StyledLink';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/authContext';
import Pagination from '../../layout/Pagination';

interface IPostProps {
    id:number 
    title: string 
    desc:string 
    img:string
}

const POST_LIMIT_PER_PAGE = 9

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
    const [currentPage, setCurrentPage] = useState(1);
    const { fetchedPosts, fetchPosts, refetchPosts } = usePosts(undefined, currentPage);

    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
        refetchPosts()
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
        refetchPosts()
    };

    return (
        <Section>
            <TitleContainer>
                <Typography variant="h3" component="h1" color="white">
                    News
                </Typography>
                { currentUser?.role === "admin" && <StyledLink to="/addnews" title="Add news" fsize={20} />}
            </TitleContainer>
            <Wrapper>
                {fetchedPosts?.data?.map(({ id, title, desc, img }: IPostProps) => (
                    <CardWrapper key={id} whileHover={{ scale: 1.1 }}>
                        <CardComponent id={id} title={title} desc={desc} img={`http://localhost:3000/api/images/${img}`} />
                    </CardWrapper>
                ))}
            </Wrapper>
            {fetchedPosts && (
            <Pagination currentPage={currentPage} hasMorePages={fetchedPosts?.data?.length > POST_LIMIT_PER_PAGE} nextPage={handleNextPage} prevPage={handlePreviousPage}/>
            )}
        </Section>
    );
};

export default Updates;
