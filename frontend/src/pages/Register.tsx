
import styled from 'styled-components'
import Squid from "../assets/sq2.png"
import Navbar from '../layout/Navbar'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from 'react';

import { useForm } from "react-hook-form"
import StyledField from '../layout/StyledField';
import StyledButton from '../layout/StyledButton';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


interface FormData  {
    login: string
    email: string
    password: string
    confirm: string
}

const LoginSection = styled.header`
    height: 100vh;
    background: linear-gradient(to right, #1f033d, #3f1352, #360033);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: white;
`

const Container = styled.header`
    height: 100vh;
    width: 100%;
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      height: 100%;
  }
`

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;



const Right = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    margin-bottom: 50px;
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
  top:-65%;
}

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #870252;
  flex-direction: column;
  width: 60%;
  border-radius: 10px;
  gap:30px;
  padding: 40px;
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;




  
  const Register: React.FC = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
      } = useForm<FormData>()

      const { registerUser}:any = useAuth();
      const onSubmit = handleSubmit((data) => {
        if(data.password == data.confirm) {
          registerUser({
            name: data.login,
            email: data.email,
            password: data.password,
        });
        }
        navigate("/login")
      })


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
            <Right>
                <Form onSubmit={onSubmit}>
                    <StyledField {...register("login")} label="First name" variant="standard" />
                    <StyledField {...register("email")} label="Email" variant="standard" />
                    <StyledField {...register("password")} type="password" label="Password" variant="standard" />
                    <StyledField {...register("confirm")} type="password" label="Confirm password" variant="standard" />
                    <StyledButton
                      title="Sign up"
                      type="submit"
                    />
                </Form>
            </Right>
        </Container>
    </LoginSection>
  )
}

export default Register