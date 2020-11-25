import React from 'react';
import Header from '../../../components/Header';
import MenuMobile from '../../../components/MenuMobile';

import { Container, Content } from './styles';

const Default: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <MenuMobile />
      <Content>{children}</Content>
    </Container>
  );
};

export default Default;
