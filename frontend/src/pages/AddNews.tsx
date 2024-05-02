import { Typography } from '@mui/material';
import { mainAxios } from '../api/axiosCreate';
import  {useContext, useState} from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';
import StyledButton from '../layout/StyledButton';
import { usePosts } from '../hooks/usePosts';


const Container = styled.div`
    gap:20px;

   display: flex;
   flex-direction: column;
   align-items: center;
`

const Content = styled.div`
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: 20px;
`

const StyledInput = styled.input `
  padding: 10px;
  border:  2px solid #870252;
  background: transparent;
  color: white;
`

const EditorContainer = styled.div`
      height: 250px;
      .ql-container.ql-snow, .ql-toolbar.ql-snow {
        border:  2px solid #870252; 
      }

      .ql-formats span {
      color:white;
    }
    .ql-stroke {
      stroke: white;
    }
`


const Buttons = styled.div`
            display: flex;
            gap:20px;
            align-items: center;
            margin-top: 50px;

`

const StyledUploadInput = styled.input `
  display: none;

`

const StyledUploadLabel = styled.label`
  padding: 10px 15px;
  background-color: #870252;
  color: white;
  cursor: pointer;
`;


export default function AddNews() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<any>(null);
  const [showError, setShowError] = useState(false);
 
  
  const {currentUser} = useContext(AuthContext)

  const {addPost} = usePosts()

  const navigate = useNavigate()
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); 
      const res = await mainAxios.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e:any) => {
    e.preventDefault();


    if (!title || !file || !value) {
      setShowError(true);
      return;
    }

    const imgUrl = await upload();


    try {
      addPost.mutate({
        title,
        desc: value,
        img: file ? imgUrl : "",
        uid: currentUser?.id
      })
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
        <Content>
          <StyledInput
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <EditorContainer>
            <ReactQuill
              value={value}
              onChange={setValue}
              style={{height: "100%", border: "none"}}
            />
          </EditorContainer>

        </Content>
        <Buttons>

          <StyledUploadInput
              type="file"
              id="file"
              name=""
              onChange={(e:any) => setFile(e.target.files[0])}
              />
            <StyledUploadLabel className="file" htmlFor="file">
              Upload Image
            </StyledUploadLabel>
            <StyledButton title={"publish"} onClick={handleClick}/>
          </Buttons>
          {showError && (!title || !file) && (
            <Typography variant="caption" style={{ color: "red", marginTop: "10px" }}>
              Please fill title, description or image
            </Typography>
          )}

      </Container>
  );
}
