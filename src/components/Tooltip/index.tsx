import React from 'react';

import { Container } from './styles';

interface ITooltiopProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ITooltiopProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
