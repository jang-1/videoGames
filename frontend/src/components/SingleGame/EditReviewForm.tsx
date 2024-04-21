import React, { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import StyledButton from '../../layout/StyledButton';

const EditorContainer = styled.div`
    height: 250px;

    .ql-container.ql-snow,
    .ql-toolbar.ql-snow {
        border: 2px solid #870252;
    }
`;
const StyledInput = styled.input`
    padding: 10px;
    border: 2px solid #870252;
    background: transparent;
    color: white;
    width: 100%;
`;


const EditReviewForm = ({ reviewData, onSave, onCancel }:any) => {
    const [title, setTitle] = useState(reviewData.title);
    const [content, setContent] = useState(reviewData.review_text);

    const handleSave = () => {
        onSave({ ...reviewData, title, review_text: content });
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Edytuj recenzję
            </Typography>
            <StyledInput
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
            <EditorContainer>
                            <ReactQuill value={content} onChange={setContent} style={{ height: '100%', border: 'none' }} />
            </EditorContainer>
            <StyledButton  title='Zapisz zmiany' onClick={handleSave} sx={{ margin: '0 1rem' }}/>
            <StyledButton  title='Anuluj'  onClick={onCancel}/>

        </div>
    );
};

export default EditReviewForm;
