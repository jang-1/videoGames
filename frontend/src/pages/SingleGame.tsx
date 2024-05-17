import  { useContext, useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, Params, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../context/authContext';
import StyledButton from '../layout/StyledButton';
import { useReview } from '../hooks/useReview';
import Rating from '@mui/material/Rating';
import CommentCard from '../components/SingleGame/CommentCard';
import EditReviewForm from '../components/SingleGame/EditReviewForm';
import { motion } from 'framer-motion';
import RawgLink from '../layout/RawgLink';
import { useGames } from '../hooks/useGames';
import { queryClient } from '../App';


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

    @media (max-width: 768px) {
       width:100%;
       margin: 0px auto 50px;
  }
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

    @media (max-width: 768px) {
       width: 95vw;
  }
`;

const SectionWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

     @media (max-width: 768px) {
       width:100%;
       padding: 0 50px;

  }
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

    .ql-formats span {
      color:white;
    }
    .ql-stroke {
      stroke: white;
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
    const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const { addReview } = useReview();
    const { currentUser } = useContext(AuthContext);
    const { id }:Readonly<Params<string>>  = useParams();

    const breadcrumbsRef = useRef(null);


    const {game, refetchSingleGame} = useGames(id)

    const {reviews, refetchReviews, deleteReviewMutation, editReviewMutation} = useReview(id)

    console.log(reviews)

    useEffect(() => {
        const fetchData = async () => {
            await refetchSingleGame();
            const { offsetTop }: any = breadcrumbsRef.current;

            window.requestAnimationFrame(() => {
                window.scrollTo(0, offsetTop - 100);
            });
        };

        fetchData();
    }, [id, refetchSingleGame]);

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        addReview.mutate(
            { userId: currentUser?.id, gameId: id, review: value, title: title },
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
            editReviewMutation.mutate(formData, {onSuccess: () => {
                setEditingReviewId(null);
                setShowEditForm(false);
                refetchReviews();
            },
            onError: (error) => {
                console.error('Edit review failed:', error);
            }}
        )
    };

    const handleDeleteReview = async (reviewId: number) => {
        deleteReviewMutation.mutate(reviewId, {
            onSuccess: () => {
                console.log("Usunieto")
                    queryClient.invalidateQueries(
                        {
                          queryKey: ['reviews'],
                          exact: true 
                        }
                      )
refetchReviews()
    

            },
            onError: (error) => {
                console.error('Edit review failed:', error);
            }
        });
    };

    const handleEditButtonClick = (reviewId: number) => {
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
            <Breadcrumbs ref={breadcrumbsRef} aria-label="breadcrumb" sx={{ color: 'white' }}>
                <StyledLink color="white" to="/games">
                    Games
                </StyledLink>
                <Typography color="#da4ea2">{game?.name}</Typography>
            </Breadcrumbs>
            <SectionWrapper>
                <StyledImage src={game?.background_image} />
                <Typography sx={{ fontSize: '40px' }} color="#da4ea2">
                    {game?.name}
                </Typography>
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
                                <Typography key={p.platform.name}>{p.platform.name}</Typography>
                            ))}
                        </TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Stores:
                        </Typography>
                        <TextWrapper>
                            {game?.stores.map((s: any) => (
                                <Typography key={s.store.name}>{s.store.name}</Typography>
                            ))}
                        </TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Genres:
                        </Typography>
                        <TextWrapper>
                            {game?.genres.map((g: any) => (
                                <Typography key={g.name}>{g.name}</Typography>
                            ))}
                        </TextWrapper>
                    </TextWrapper>
                    <TextWrapper>
                        <Typography fontWeight="bold" color="#da4ea2">
                            Developers:
                        </Typography>
                        <TextWrapper>
                            {game?.developers.map((d: any) => (
                                <Typography key={d.name}>{d.name}</Typography>
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
                    <RawgLink/>
                </Right>
                {currentUser ? (
                    <Content>
                        <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'}>
                            Comment game
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
                        Sign in to add a comment!
                    </Typography>
                )}
                <div
                    style={{width:"100%"}}
                >
                    {!reviews || reviews.length === 0 ? (
    <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'}>
        No reviews / Comments, add one!
    </Typography>
) : (
    <CommentsContainer>
        <Typography fontSize={20} fontWeight={'bold'} textAlign={'center'}>
            Reviews
        </Typography>
        {reviews?.map((r) =>
            editingReviewId === r.id && showEditForm ? (
                <EditReviewForm
                    key={r.id}
                    reviewData={r}
                    onSave={handleEditReview}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <CommentCard
                        data={r}
                        onEdit={() => handleEditButtonClick(r.id)}
                        onDelete={() => handleDeleteReview(r.id)}
                    />
                </motion.div>
            )
        )}
    </CommentsContainer>
)}
                </div>
            </SectionWrapper>
        </Container>
    );
};

export default SingleGame;
