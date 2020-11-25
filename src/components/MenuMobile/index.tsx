import React from 'react';
import { FiHome } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

const MenuMobile: React.FC = () => {
  const HandleActive = (active: boolean, to: string) => {
    const match = useRouteMatch({
      path: to,
      exact: active,
    });

    return match ? 'active' : '';
  };

  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/" className={HandleActive(true, '/dashboard')}>
              <FiHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className={HandleActive(false, '/transactions')}
            >
              <RiDashboardLine />
              <span>Cadastar</span>
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default MenuMobile;
