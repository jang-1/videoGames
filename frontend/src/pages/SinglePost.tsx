import  { useContext, useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link, Params, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../context/authContext';
import StyledButton from '../layout/StyledButton';
import User from "../assets/user.png"
import { formatDateTime } from '../lib/formatDateTime';
import DOMPurify from "dompurify";
import EditPostForm from '../components/Home/EditPostForm';
import { usePosts } from '../hooks/usePosts';


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

const BoxWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
`;

const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


const DateContainer = styled.div`
    display: flex;

    gap: 10px;
`;

const Img = styled.img`
    width: 40px;
`;



const SinglePost = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);

    const { currentUser } = useContext(AuthContext);
 

    const { id }:Readonly<Params<string>>  = useParams();

    const breadcrumbsRef = useRef(null);

    const { singlePost, refetch } = usePosts(id)
    const post = singlePost?.data;


    useEffect(() => {
        const fetchData = async () => {
            await refetch();
            const { offsetTop }: any = breadcrumbsRef.current;

            window.requestAnimationFrame(() => {
                window.scrollTo(0, offsetTop - 100);
            });
        };

        fetchData();
    }, [id, refetch]);


    const isAdmin = currentUser && currentUser.role === 'admin';

    const handleEdit = () => {
            setTitle(post?.title);
            setValue(post?.desc);
            setShowEditForm(true);
    };


    return (
        <Container>
            <Breadcrumbs ref={breadcrumbsRef} aria-label="breadcrumb" sx={{ color: 'white' }}>
                <StyledLink color="white" to="/">
                    Posts
                </StyledLink>
                <Typography color="#da4ea2">{post?.title}</Typography>
            </Breadcrumbs>
            {!showEditForm &&<SectionWrapper>
                <StyledImage src={`public/upload/${post?.img}`} />
                <Typography sx={{ fontSize: '40px' }} color="#da4ea2">
                    {post?.title}
                </Typography>
                <BoxWrapper>
                    <UserWrapper>

                        <Img src={User} alt="" />
                        <Typography fontSize={16} fontWeight={"bold"}>{post?.username}</Typography>
                    </UserWrapper>
                <DateContainer>
                    <Typography fontWeight="bold" color="#da4ea2">
                                Posted:
                            </Typography>
                    <TextWrapper>{formatDateTime(post?.created_at)}</TextWrapper>
                </DateContainer>
                </BoxWrapper>
                <Right>
                    <TextWrapper>
                        <p
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post?.desc),
                        }}
                        ></p>
                    </TextWrapper>
                </Right>
            </SectionWrapper>}
            {isAdmin && !showEditForm && (
            <StyledButton onClick={handleEdit} title='Edit Post' />
        )}
            {showEditForm && (
            <EditPostForm
                title={title}
                setTitle={setTitle}
                value={value}
                setValue={setValue}
                postId={id}
                userId={post.uid}
                setShowEditForm={setShowEditForm}
                refetch={refetch}
            />
        )}
        </Container>
    );
};

export default SinglePost;
