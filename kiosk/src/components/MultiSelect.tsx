import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ selected }: { selected: boolean }) =>
    selected ? 'white' : '#333'};
  height: 4rem;
  box-sizing: border-box;
  transition: color 0.5s;
`;

const Indicator = styled.span`
  position: absolute;
  transform: translateY(
    calc(100% * ${({ index }: { index: number }) => index})
  );
  background-color: #556dea;
  width: 100%;
  height: 4rem;
  transition: all 0.5s;
  border-radius: 1rem;
`;

const Bg = styled.div`
  width: ${({ width }: { width: number }) => width}rem;
  position: relative;
`;

const MultiSelect = ({
  list,
  width,
  socket,
}: {
  list: Array<string>;
  width: number;
  socket: any;
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    socket.on('swipe_up', () => {
      console.log('swiped up');
      setTabIndex((index) => (index - 1 >= 0 ? index - 1 : list.length - 1));
    });
    socket.on('swipe_down', () => {
      console.log('swiped down');
      setTabIndex((index) => (index + 1 < list.length ? index + 1 : 0));
    });
  }, []);
  return (
    <Bg width={width}>
      <Indicator index={tabIndex} />
      {list.map((item, index) => (
        <Item
          key={item}
          selected={tabIndex === index}
          onClick={() => setTabIndex(index)}
        >
          {item}
        </Item>
      ))}
    </Bg>
  );
};

export default MultiSelect;
