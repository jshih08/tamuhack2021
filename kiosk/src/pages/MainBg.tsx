import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import contour from '../../assets/contour.svg';

const Title = styled.h1`
  font-weight: lighter;
  color: white;
  text-align: center;
  margin: 3rem 0;
  font-size: 3rem;
`;

const CountDown = styled.h1`
  font-weight: lighter;
  color: white;
  text-align: center;
  font-size: 10rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30vh;
`;

const promiseTimeOut = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const MainBg = ({ socket }: { socket: any }) => {
  const [count, setCount] = useState<number | undefined>(undefined);

  const history = useHistory();

  const startCountDown = async () => {
    setCount(3);
    await promiseTimeOut(1000);
    setCount(2);
    await promiseTimeOut(1000);
    setCount(1);
    await promiseTimeOut(1000);
    setCount(undefined);
    history.push('/carousel');
  };

  useEffect(() => {
    socket.on('face', (msg) => {
      console.log('face detected');
      startCountDown();
    });
  }, []);

  return (
    <div>
      <Title>Stand in front of the camera to get started</Title>
      <img alt="contour" width="100%" src={contour} />
      {count !== undefined && <CountDown>{count}</CountDown>}
    </div>
  );
};

export default MainBg;
