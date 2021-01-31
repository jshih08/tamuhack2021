import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import chevronRight from '../../assets/chevronRight.svg';
import chevronLeft from '../../assets/chevronLeft.svg';
import table from '../../assets/table.png';
import MultiSelect from '../components/MultiSelect';
import logo from '../../assets/logo.png';
import swipe from '../../assets/swipe.png';

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
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  align-items: center;
`;

const H2 = styled.div`
  font-weight: 300;
  justify-content: center;
  display: flex;
`;

const Language = ({ socket }: { socket: any }) => (
  <Card>
    <H1>We’re glad you’re here</H1>
    <Main style={{ justifyContent: 'space-between' }}>
      <MultiSelect
        socket={socket}
        width={10}
        list={['English', 'Español', 'Chinese']}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '25rem',
          justifySelf: 'flex-end',
        }}
      >
        <img
          src={swipe}
          alt="swipe"
          style={{ width: '10rem', height: '10rem' }}
          className="float_up"
        />
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            color: '#555',
            marginLeft: '3rem',
          }}
        >
          Swipe up or down in front of the camera to change languages
        </p>
      </div>
    </Main>
  </Card>
);

const ReviewReservation = ({ socket }: { socket: any }) => (
  <Card>
    <H1>Review your reservation</H1>
    <Main>
      <img
        alt="table"
        src={table}
        style={{ width: '70%', marginRight: '1rem' }}
      />
      <MultiSelect
        socket={socket}
        width={17}
        list={['Change Seat', 'Change Flight', 'All Good!']}
      />
    </Main>
  </Card>
);

const Traveling = ({ socket }: { socket: any }) => (
  <Card>
    <H1>Are you traveling with a child under the age of 12?</H1>
    <Main>
      <MultiSelect socket={socket} width={10} list={['Yes', 'No']} />
    </Main>
  </Card>
);

const Reservation = ({ socket }: { socket: any }) => (
  <Card>
    <H1>Let's locate your reservation</H1>
    <Subtitle>Please select:</Subtitle>
    <Main>
      <MultiSelect
        socket={socket}
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
const Loading = ({ socket }: { socket: any }) => (
  <Card>
    <Main>
      <H1>Just a moment while we locate your reservation...</H1>
    </Main>
  </Card>
);

const Military = ({ socket }: { socket: any }) => (
  <Card>
    <H1>Are you in US military?</H1>
    <Main>
      <MultiSelect
        socket={socket}
        width={40}
        list={[
          'Active military duty - on orders',
          'Active military duty - not on orders',
          'Not military',
        ]}
      />
    </Main>
  </Card>
);

const Loading2 = () => (
  <Card>
    <H1>Just a moment while we fufill your request...</H1>
  </Card>
);

const BagCheck = ({ socket }: { socket: any }) => (
  <Card>
    <H1>Will you be checking bags today?</H1>
    <H2>
      <MultiSelect
        socket={socket}
        width={40}
        list={['1 bag - $25', '2 bags - $60', '3 bags - $210']}
      />
    </H2>
  </Card>
);

const CarouselScreen = ({ socket }: { socket: any }) => {
  // const CarouselScreen = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    socket.on('swipe_right', () => {
      console.log('swiped right');
      setIndex((index) => index + 1);
    });
    socket.on('swipe_left', () => {
      console.log('swiped left');
      setIndex((index) => index - 1);
    });
  }, []);

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
        <Language socket={socket} />
        <Reservation socket={socket} />
        <Loading socket={socket} />
        <Traveling socket={socket} />
        <Military socket={socket} />
        <Loading2 />
        <ReviewReservation socket={socket} />
        <BagCheck socket={socket} />
      </Carousel>
      <img alt="right arrow" src={chevronRight} className="floating_right" />
      <img
        alt="logo"
        src={logo}
        style={{ position: 'absolute', bottom: 0, left: '2rem' }}
      />
    </Bg>
  );
};

export default CarouselScreen;
