import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import axios from 'axios';
import StyledButton from '../../layout/StyledButton';

const FormContainer = styled.div`
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 2px solid #870252;
    background: transparent;
    color: white;
`;

const EditorContainer = styled.div`
    height: 250px;
    .ql-container.ql-snow, .ql-toolbar.ql-snow {
        border: 2px solid #870252;
    }
`;

const StyledUploadInput = styled.input`
    display: none;
`;

const StyledUploadLabel = styled.label`
    padding: 10px 15px;
    background-color: #870252;
    color: white;
    cursor: pointer;
    margin-top: 50px;
    width:fit-content;
`;

const EditPostForm = ({ title, setTitle, value, setValue, image, userId, postId, setShowEditForm, refetch }: any) => {
    const [file, setFile] = useState(null);

    const handleImageChange = (e:any) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);
    };

    const uploadImage = async () => {
        try {
            const formData:any = new FormData();
            formData.append('file', file);
            const res = await axios.post('http://localhost:3000/api/upload', formData);
            return res.data;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e:any) => {
      e.preventDefault();
      try {
          let imgUrl = image; 
  

          if (file) {
              imgUrl = await uploadImage();
          }
  


          if(imgUrl) {

            await axios.put(`http://localhost:3000/api/posts/${postId}`, {
                title,
                desc: value,
                img: imgUrl,
                uid: userId
            });
          } else {
            await axios.put(`http://localhost:3000/api/posts/${postId}`, {
              title,
              desc: value,
              uid: userId
          });
          }
  
          setShowEditForm(false);
          refetch()
      } catch (error) {
          console.error('Error updating post:', error);
      }
  };
  

    return (
        <FormContainer>
            <StyledInput
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <EditorContainer>
                <ReactQuill
                    value={value}
                    onChange={setValue}
                    style={{ height: '100%', border: 'none' }}
                />
            </EditorContainer>
            <StyledUploadInput
                type="file"
                id="file"
                name="file"
                onChange={handleImageChange}
            />
            <StyledUploadLabel htmlFor="file">Upload Image</StyledUploadLabel>
            <StyledButton type="submit" onClick={handleSubmit} title={"Save Changes"}/>
            <StyledButton  onClick={() => {setShowEditForm(false);}} title={"Cancel"}/>
        </FormContainer>
    );
};

export default EditPostForm;
