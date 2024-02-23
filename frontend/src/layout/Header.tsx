
import styled from 'styled-components'
import LineImg from "../assets/line.png"
import Squid from "../assets/sq2.png"
import Navbar from './Navbar'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from 'react';

const HeaderSection = styled.header`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const Container = styled.header`
    height: 100vh;
    width: 1400px;
    display: flex;
    justify-content: space-between;
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

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    text-align: center;
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
  flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const Img = styled.img`
  object-fit: contain;
  position: absolute;
  height: 500px;
  top: -200px;
  bottom: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Header = () => {
  return (
    <HeaderSection>
        <Navbar />
        <Container>
            <Left>
                <Title>Twoja pasja, nasza platforma. Odkrywaj, graj i łącz się z grami wideo na nowy sposób!</Title>
                <Info>
                    <Line src={LineImg}></Line>
                    <Subtitle>Newsy, rankingi, twórcy i wiele więcej!</Subtitle>
                </Info>
            </Left>
            <Right>
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
            </Right>
        </Container>
    </HeaderSection>
  )
}

export default Header