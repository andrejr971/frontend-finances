import React from 'react';
import { HiSun, HiOutlineSun } from 'react-icons/hi';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { RiDashboardLine } from 'react-icons/ri';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/icon.svg';

import {
  ButtonTheme,
  Container,
  Content,
  LogOut,
  Profile,
  RightSide,
  LeftSide,
} from './styles';
import { useTheme } from '../../hooks/theme';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { setThemeName, themeName } = useTheme();

  const HandleActive = (active: boolean, to: string) => {
    const match = useRouteMatch({
      path: to,
      exact: active,
    });

    return match ? 'active' : '';
  };

  return (
    <Container>
      <Content>
        <LeftSide>
          <img src={logoImg} alt="Logo Finances" />

          <nav>
            <ul>
              <li>
                <Link to="/" className={HandleActive(true, '/dashboard')}>
                  <FiHome />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  className={HandleActive(false, '/transactions')}
                >
                  <RiDashboardLine />
                  Cadastrar
                </Link>
              </li>
            </ul>
          </nav>
        </LeftSide>

        <RightSide>
          <ButtonTheme type="button" onClick={setThemeName}>
            {themeName === 'dark' ? <HiSun /> : <HiOutlineSun />}
          </ButtonTheme>

          <Profile to="/profile">
            <div>
              <img
                src={
                  user.avatar
                    ? user.avatar.url
                    : `https://ui-avatars.com/api/?name=${user.name}${user.last_name}&background=1c1b22&color=fff&bold=true&format=svg&size=110`
                }
                alt={`Perfil ${user.name}`}
              />
            </div>

            <strong>{`${user.name} ${user.last_name}`}</strong>
          </Profile>

          <LogOut type="button" onClick={signOut}>
            <FiLogOut />
          </LogOut>
        </RightSide>
      </Content>
    </Container>
  );
};

export default Header;
