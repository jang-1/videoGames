// CommentCard.js

import React, { useContext } from 'react';
import { format } from 'date-fns';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import User from "../../assets/user.png";
import StyledButton from '../../layout/StyledButton';
import { AuthContext } from '../../context/authContext';
import { pl } from 'date-fns/locale/pl';

const StyledPaper = styled(Paper)`
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: white;
    background-color: #870252;
    gap: 20px;
    padding: 10px;
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: white;

`;
const ColumnUserContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    color: white;
    align-items: center;
`;

const Img = styled.img`
    width: 40px;
`;

const getText = (html:any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
};

const CommentCard = ({ data, onEdit, onDelete }:any) => {
    const { currentUser }: any = useContext(AuthContext);
    const formatDateTime = (dateTime: string) => {
        const parsedDate = new Date(dateTime);

        parsedDate.setHours(parsedDate.getHours() + 2);
        const formattedDate = format(parsedDate, 'dd-MM-yyyy HH:mm', { locale: pl });
        return formattedDate !== 'Invalid Date' ? formattedDate : 'Nieznana data';
    };
    return (
        <StyledPaper elevation={12} sx={{ width: "100%" }}>
            <Container>
                <Wrapper>
                    <ColumnContainer>
                        <Typography sx={{display:"flex", alignSelf:"flex-start"}} fontSize={24} fontWeight={"bold"}>{data.title}</Typography>
                        <Typography fontSize={12} fontWeight={"bold"}>
                            Dodany: {formatDateTime(data.createdAt)}
                        </Typography>
                        {data.updatedAt && <Typography fontSize={12} fontWeight={"bold"}>
                            Edytowany: {formatDateTime(data.updatedAt)}
                        </Typography>}
                    </ColumnContainer>
                    <ColumnUserContainer >
                        <Img src={User} alt="" />
                        <Typography fontSize={16} fontWeight={"bold"}>{data.user_name}</Typography>
                    </ColumnUserContainer>
                </Wrapper>
                <Typography fontSize={16}>{getText(data.review_text)}</Typography>
                {currentUser?.id == data.user_id && <div style={{display:"flex", gap:10,}}>
                    <StyledButton variant='outlined' fsize={10} title="Edytuj" onClick={() => onEdit(data)}/>
                    <StyledButton variant='outlined'fsize={10} title="Usuń" onClick={() => onDelete(data.id)}/>
                </div>}
            </Container>
        </StyledPaper>
    );
};

export default CommentCard;
