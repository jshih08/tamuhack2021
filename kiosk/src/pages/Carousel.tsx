import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import chevronRight from '../../assets/chevronRight.svg';
import chevronLeft from '../../assets/chevronLeft.svg';
import MultiSelect from '../components/MultiSelect';

const Card = styled.div`
  background-color: white;
  border-radius: 2rem;
  -webkit-box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);
  padding: 3rem 5rem;
  height: 60vh;
  margin-top: 13vh;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const Bg = styled.div`
  display: flex;
  height: 100vh;
`;

const H1 = styled.h1`
  color: #1565c0;
  font-weight: 300;
  font-size: 3rem;
  margin-bottom: 4rem;
`;

const Main = styled.div`
  display: flex;
`;

const H2 = styled.div`
  font-weight: 300;
  justify-content: center;
  display: flex;
`;

const Language = () => (
  <Card>
    <H1>We’re glad you’re here</H1>
    <Main>
      <MultiSelect width={10} list={['English', 'Español', 'Chinese']} />
      {/* <img src={} /> */}
    </Main>
  </Card>
);

const Loading = () => (
  <Card>
    <H1>Just a moment while we locate your reservation...</H1>
    <Main>
      
    </Main>
  </Card>
);

const Military = () => (
  <Card>
    <H1>Are you in US military?</H1>
    <H2>
    <MultiSelect width={40} list={['Active military duty - on orders', 'Active military duty - not on orders', 'Not military']} />

    </H2>
  </Card>
);

const Loading2 = () => (
  <Card>
    <H1>Just a moment while we fufill your request...</H1>
    <Main>
      
    </Main>
  </Card>
);

const BagCheck = () => (
  <Card>
    <H1>Will you be checking bags today?</H1>
    <H2>
    <MultiSelect width={40} list={['1 bag - $25', '2 bags - $60', '3 bags - $210']} />

    </H2>
  </Card>
);

const CarouselScreen = ({ socket }: { socket: any }) => {
  // const CarouselScreen = () => {
  const [index, setIndex] = useState(0);

  return (
    <Bg>
      <img alt="left arrow" src={chevronLeft} className="floating_left" />
      <Carousel
        autoPlay={false}
        animation="slide"
        index={index}
        navButtonsAlwaysInvisible
        onChange={setIndex}
        className="carousel"
      >
        <Language />
        <Loading />
        <Military />
        <Loading2 />
        <BagCheck />
      </Carousel>
      <img alt="right arrow" src={chevronRight} className="floating_right" />
    </Bg>
  );
};

export default CarouselScreen;
