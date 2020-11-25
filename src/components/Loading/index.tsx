import React from 'react';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container className="lds-facebook">
      <div />
      <div />
      <div />
    </Container>
  );
};

export default Loading;
