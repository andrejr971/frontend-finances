import React from 'react';
import { Bar } from 'react-chartjs-2';
import { IIncome } from '../../../hooks/dashboard';
import { Container } from './styles';

interface ChartsProps {
  data: IIncome;
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  return (
    <Container>
      <Bar data={data} />
    </Container>
  );
};

export default Charts;
