import { Suspense, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; 
import styled from 'styled-components';
import StyledButton from '../layout/StyledButton';
import { Typography } from '@mui/material';
import Navbar from '../layout/Navbar';
import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
import Squid from "../assets/sq2.png"
import emailjs from '@emailjs/browser';

const emailKey = import.meta.env.VITE_EMAIL_KEY;
const emailService = import.meta.env.VITE_EMAIL_SERVICE;
const emailTemplate = import.meta.env.VITE_EMAIL_TEMPLATE;


const Content = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const StyledInput = styled.input `
    padding: 10px;
    border:  2px solid #870252;
    background: transparent;
    color: white;
`;


const Buttons = styled.div`
    display: flex;
    gap:20px;
    align-items: center;
    margin-top: 50px;
`;



const LoginSection = styled.header`
  height: 100vh;
  background: linear-gradient(to right, #1f033d, #3f1352, #360033);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    height:100%;
    color:white
  }
`

const Container = styled.header`
  height: 100vh;
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
  flex-direction: column;
  width: 100%;
}
`

const Left = styled.div`
flex: 2;
display: flex;
flex-direction: column;
justify-content: center;
gap: 20px;

`;



const Right = styled.form`
display: flex;
flex: 3;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
@media only screen and (max-width: 768px) {
  width: 100%;
}
`;

const Img = styled.img`
object-fit: contain;
position: absolute;
height: 500px;
top: -150px;
bottom: 0;
left: -850px;
right: 0;
margin: auto;
animation: animate 2s infinite ease alternate;

@media only screen and (max-width: 768px) {
  width: 300px;
  height: 300px;
  left: 0%;
  top:-55%;
}

@keyframes animate {
  to {
    transform: translateY(20px);
  }
}
`;

const TextArea = styled.textarea`
  padding: 20px;
  border:  2px solid #870252; 
  border-radius: 5px;
  background-color: transparent;
  color: white;
`;




function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [success, setSuccess] = useState<any>(null)

  

  const form = useRef<any>(null)

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    emailjs
    .sendForm(emailService, emailTemplate, form.current, {
      publicKey: emailKey,
    })
    .then(
      () => {
        console.log('SUCCESS!');
        setSuccess(true)
      },
      (error) => {
        console.log('FAILED...', error.text);
        setSuccess(false)
      },
    );
  };


  return (
    <LoginSection>
    <Navbar />
    <Container>
        <Left>
        <Canvas>
                <Suspense fallback={null}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={1} />
                <directionalLight position={[3, 2, 1]} />
                <Sphere args={[1, 100, 200]} scale={2.3}>
                    <MeshDistortMaterial
                    color="#5d076a"
                    attach="material"
                    distort={0.5}
                    speed={1}
                    />
                </Sphere>
                </Suspense>
            </Canvas>
            <Img src={Squid}/>
        </Left>
        <Right ref={form}>
         

            <Typography color="white" fontSize={30} fontWeight={"bold"}>Contact us!</Typography>
            <Content>
              <StyledInput
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <StyledInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextArea
                placeholder="Write your message"
                name="message"
                onChange={handleChange}
                rows={10}
              />
            </Content>
            <Buttons>
            <StyledButton type="submit" title={"Send"} onClick={handleSubmit}/>
            </Buttons>
            {success && "Your message has been sent. We'll get back to you soon :)"}

        </Right>
    </Container>
</LoginSection>
  );
}

export default Contact;

