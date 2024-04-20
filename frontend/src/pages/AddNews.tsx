import { Typography } from '@mui/material';
import React, {useState} from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.div`
    gap:20px;
    margin: 20px;
    display: flex;
`

const Content = styled.div`
        flex: 3;
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
`

const Menu = styled.div`
          flex: 2;
        display: flex;
        flex-direction: column;
        gap: 20px;
`
const Item = styled.div`
          border:  2px solid #870252;
          padding: 10px;
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 12px;
`
const Buttons = styled.div`
            display: flex;
            justify-content: space-between;

            :first-child{
              cursor: pointer;
              color: teal;
              background-color: white;
              border: 1px solid teal;
              padding: 3px 5px;
            }
            :last-child{
              cursor: pointer;
              color: white;
              background-color: teal;
              border: 1px solid teal;
              padding: 3px 5px;
            }
`


export default function AddNews() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  // const navigate = useNavigate()

  const upload = async () => {
    // try {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   const res = await axios.post("/upload", formData);
    //   return res.data;
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleClick = async (e:any) => {
    e.preventDefault();
    const imgUrl = await upload();

    // try {
    //   state
    //     ? await axios.put(`/posts/${state.id}`, {
    //         title,
    //         desc: value,
    //         cat,
    //         img: file ? imgUrl : "",
    //       })
    //     : await axios.post(`/posts/`, {
    //         title,
    //         desc: value,
    //         cat,
    //         img: file ? imgUrl : "",
    //         date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    //       });
    //       navigate("/")
    // } catch (err) {
    //   console.log(err);
    // }
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
              // theme="snow"
              value={value}
              onChange={setValue}
              style={{height: "100%", border: "none"}}
            />
          </EditorContainer>
        </Content>
        <Menu>
          <Item>
            <Typography fontSize={20}>Publish</Typography>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none", textDecoration: "underline", cursor: "pointer" }}
              type="file"
              id="file"
              name=""
              onChange={(e:any) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <Buttons>
              <button>Save as a draft</button>
              <button onClick={handleClick}>Publish</button>
            </Buttons>
          </Item>
        </Menu>
      </Container>
  );
}
