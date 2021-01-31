import React, { useState } from 'react';
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
`;

const Language = () => (
  <Card>
    <H1>We’re glad you’re here</H1>
    <MultiSelect width={10} list={['hey', 'hey2', 'hey3']} />
  </Card>
);

const CarouselScreen = () => {
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
      </Carousel>
      <img alt="right arrow" src={chevronRight} className="floating_right" />
    </Bg>
  );
};

export default CarouselScreen;
