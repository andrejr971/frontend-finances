import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { ICategory } from '../../../../hooks/transactions';

import { Container } from './styles';

interface CardProps {
  category: ICategory;
}

const Card: React.FC<CardProps> = ({ category }) => {
  return (
    <Container>
      <strong>{category.name}</strong>
      <span>{category.data}</span>
    </Container>
  );
};

export default Card;
