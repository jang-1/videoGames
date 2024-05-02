import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import StyledButton from '../../layout/StyledButton';
import { usePosts } from '../../hooks/usePosts';
import { mainAxios } from '../../api/axiosCreate';

interface IProps {
    title: string 
    setTitle: Dispatch<SetStateAction<string>>
    value: string
    setValue: Dispatch<SetStateAction<string>>
    userId: string
    postId: string | undefined
    setShowEditForm: Dispatch<SetStateAction<boolean>>
    refetch: () => {}
}

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

const EditPostForm = ({ title, setTitle, value, setValue, userId, postId, setShowEditForm, refetch }: IProps) => {
    const [file, setFile] = useState<File | null>(null); 

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        if (selectedImage) {
            setFile(selectedImage);
        }
    };
    const {updatePostMutation} = usePosts(postId)

    const uploadImage = async () => {
        try {
            const formData:FormData  = new FormData();
            if (file !== null) {
                formData.append('file', file);
              }
            const res = await mainAxios.post('/upload', formData);
            return res.data;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e:SubmitEvent) => {
      e.preventDefault();
      try {
          let imgUrl; 
  

          if (file) {
              imgUrl = await uploadImage();
          }
  

          if(imgUrl) {
            updatePostMutation.mutate({
                title,
                desc: value,
                img: imgUrl,
                uid: userId
            })
          } else {
            updatePostMutation.mutate({
                title,
              desc: value,
              uid: userId
            })
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
