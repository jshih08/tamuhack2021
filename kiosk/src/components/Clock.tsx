import React, { useState } from 'react';
import styled from 'styled-components';

const Clock = ({ depart, style }: { depart: any; style: any }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', ...style }}>
      <h1>{depart}</h1>
      <h1>HAWWW</h1>
    </div>
  );
};

export default Clock;
