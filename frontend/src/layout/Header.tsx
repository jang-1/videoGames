import styled from 'styled-components'
import LineImg from "../assets/line.png"
import Squid from "../assets/sq2.png"
import Navbar from './Navbar'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from 'react';

const HeaderSection = styled.header`
    height: calc(100vh - 100px);
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
`

const Container = styled.header`
    width:100%;
    max-width: 1400px;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    height: 100%;
    margin: 50px 0;
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
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    text-align: center;
    font-size: 30px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #da4ea2;
`;



const Right = styled.div`
  display: flex;
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const Img = styled.img`
  height: 500px;
  position: absolute;
  top: calc(50% - 10%);
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: 768px) {
      height: 250px;
      transform: translate(-50%, -70%);
  }
`;

const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%; 
`;


const Header = () => {
  return (
    <>
    <Navbar />
    <HeaderSection>
        <Container>
            <Left>
                <Title>Your passion, our platform. Discover, play and connect with video games in new ways!</Title>
                <Info>
                    <Line src={LineImg}></Line>
                    <Subtitle>News, rankings, creators and much more!</Subtitle>
                </Info>
            </Left>
            <Right>
              <CanvasContainer>
                  <Canvas style={{width:"100%", height:"100%"}}>
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
                </CanvasContainer>
            </Right>
        </Container>
    </HeaderSection>
    </>
  )
}

export default Header
