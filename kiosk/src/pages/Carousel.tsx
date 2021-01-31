import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import chevronRight from '../../assets/chevronRight.svg';
import chevronLeft from '../../assets/chevronLeft.svg';
import table from '../../assets/table.png';
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
  margin-bottom: 3rem;
`;

const Subtitle = styled.h2`
  color: #1565c0;
  font-size: 1.5rem;
  font-weight: 300;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
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

const ReviewReservation = () => (
  <Card>
    <H1>Review your reservation</H1>
    <Main>
      <img
        alt="table"
        src={table}
        style={{ width: '70%', marginRight: '1rem' }}
      />
      <MultiSelect
        width={17}
        list={['Change Seat', 'Change Flight', 'All Good!']}
      />
    </Main>
  </Card>
);

const Traveling = () => (
  <Card>
    <H1>Are you traveling with a child under the age of 12?</H1>
    <Main>
      <MultiSelect width={10} list={['Yes', 'No']} />
    </Main>
  </Card>
);

const Reservation = () => (
  <Card>
    <H1>Let's locate your reservation</H1>
    <Subtitle>Please select:</Subtitle>
    <Main>
      <MultiSelect
        width={30}
        list={[
          'Face Identification',
          'Scan Passport',
          'Scan Government Issued ID',
        ]}
      />
      {/* <img src={} /> */}
    </Main>
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
        <Reservation />
        <Traveling />
        <ReviewReservation />
      </Carousel>
      <img alt="right arrow" src={chevronRight} className="floating_right" />
    </Bg>
  );
};

export default CarouselScreen;
