import React, { useContext, useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Typography, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import axios, { API_KEY } from '../api/axiosCreate';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../context/authContext';
import StyledButton from '../layout/StyledButton';
import { useReview } from '../hooks/useReview';
import Rating from '@mui/material/Rating';
import CommentCard from '../components/SingleGame/CommentCard';
import EditReviewForm from '../components/SingleGame/EditReviewForm';

const StyledLink = styled(Link)`
    color: white;

    &:hover {
        color: #da4ea2;
    }
`;

const Container = styled.div`
    width: 70%;
    display: flex;
    margin: 0px auto 150px;
    row-gap: 30px;
    flex-direction: column;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

const StyledImage = styled.img`
    object-fit: contain;
    width: 50vw;
    border-radius: 30px;
`;

const SectionWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TextWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    row-gap: 20px;
    column-gap: 30px;
`;

const Content = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 2px solid #870252;
    background: transparent;
    color: white;
`;

const EditorContainer = styled.div`
    height: 250px;

    .ql-container.ql-snow,
    .ql-toolbar.ql-snow {
        border: 2px solid #870252;
    }
`;

const CommentsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SingleGame = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const { currentUser }: any = useContext(AuthContext);
    const { addReview } = useReview();

    const { id }: any = useParams();

    const titleRef = useRef(null);

    const { data: singleGame, refetch } = useQuery({
        queryKey: ['game', id],
        queryFn: () => {
            return axios.get(`/games/${id}?${API_KEY}`);
        },
        enabled: false,
    });
    const game = singleGame?.data;

    const { data: fetchedReviews, refetch: refetchReviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: () => {
            return axios.get(`http://localhost:3000/api/reviews/${id}`);
        },
        enabled: true,
    });
    const reviews = fetchedReviews?.data;

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
            const { offsetTop }: any = titleRef.current;

            window.requestAnimationFrame(() => {
                window.scrollTo(0, offsetTop);
            });
        };

        fetchData();
    }, [id, refetch]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        addReview.mutate(
            { userId: parseInt(currentUser.id), gameId: parseInt(id), review: value, title: title },
            {
                onSuccess: (data) => {
                    console.log('Review submitted successfully:', data);
                    setValue('');
                    setTitle('');
                    refetchReviews();
                },
                onError: (error) => {
                    console.error('Review submission failed:', error);
                },
            }
        );
    };

    const handleEditReview = async (formData: any) => {
        try {
            await axios.put(`http://localhost:3000/api/reviews/${formData.id}`, formData);
            setEditingReviewId(null);
            setShowEditForm(false);
            refetchReviews();
        } catch (error) {
            console.error('Edit review failed:', error);
        }
    };

    const handleDeleteReview = async (reviewId: any) => {
        try {
            await axios.delete(`http://localhost:3000/api/reviews/${reviewId}`);
            refetchReviews();
        } catch (error) {
            console.error('Delete review failed:', error);
        }
    };

    const handleEditButtonClick = (reviewId: any) => {
        setEditingReviewId(reviewId);
        setShowEditForm(true);
    };

    const handleCancelEdit = () => {
        setEditingReviewId(null);
        setShowEditForm(false);
    };

    console.log(game?.rating);
    return (
        <Container>
            <Typography ref={titleRef} sx={{ fontSize: '40px' }}>
                {game?.name}
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
                <StyledLink color="white" to="/games">
                    Games
                </StyledLink>
                <Typography color="#da4ea2">{game?.name}</Typography>
            </Breadcrumbs>
            <SectionWrapper>
                <StyledImage src={game?.background_image} />
                <Right>
                    <TextWrapper>
                        <Typography textAlign="justify">{game?.description_raw}</Typography>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Relased:
                        </Typography>
                        <TextWrapper>{game?.released}</TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Platforms:
                        </Typography>
                        <TextWrapper>
                            {game?.platforms.map((p: any) => (
                                <Typography>{p.platform.name}</Typography>
                            ))}
                        </TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Stores:
                        </Typography>
                        <TextWrapper>
                            {game?.stores.map((s: any) => (
                                <Typography>{s.store.name}</Typography>
                            ))}
                        </TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Genres:
                        </Typography>
                        <TextWrapper>
                            {game?.genres.map((g: any) => (
                                <Typography>{g.name}</Typography>
                            ))}
                        </TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Developers:
                        </Typography>
                        <TextWrapper>
                            {game?.developers.map((d: any) => (
                                <Typography>{d.name}</Typography>
                            ))}
                        </TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Rating:
                        </Typography>
                        <TextWrapper>
                            <Rating value={game?.rating || 0} precision={0.01} readOnly />
                        </TextWrapper>
                    </TextWrapper>
                </Right>
                {currentUser ? (
                    <Content>
                        <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'}>
                            Skomentuj grę
                        </Typography>
                        <StyledInput
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <EditorContainer>
                            <ReactQuill value={value} onChange={setValue} style={{ height: '100%', border: 'none' }} />
                        </EditorContainer>
                        <StyledButton title={'Wyślij'} onClick={(e: any) => handleSubmit(e)} />
                    </Content>
                ) : (
                    <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'}>
                        Zaloguj się, aby dodać komentarz!
                    </Typography>
                )}
                <CommentsContainer>
                {reviews ? <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'}>
                        Recenzje / Komentarze
                    </Typography>: <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'}>
                       Brak Recenzji / Komentarzy, dodaj jakis!
                    </Typography>}
                    {reviews &&
                        (reviews as any).map((r: any) =>
                            editingReviewId === r.id && showEditForm ? (
                                <EditReviewForm
                                    key={r.id}
                                    reviewData={r}
                                    onSave={handleEditReview}
                                    onCancel={handleCancelEdit}
                                />
                            ) : (
                                <CommentCard
                                    key={r.id}
                                    data={r}
                                    onEdit={() => handleEditButtonClick(r.id)}
                                    onDelete={() => handleDeleteReview(r.id)}
                                />
                            )
                        )}
                </CommentsContainer>
            </SectionWrapper>
        </Container>
    );
};

export default SingleGame;
