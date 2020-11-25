import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/icon.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container, DivCreateAccount, RightSide } from './styles';
import api from '../../services/api';

interface IRequest {
  password: string;
  password_confirmation: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();
  const { search } = useLocation();

  useEffect(() => {
    if (!search.split('=')[1]) {
      history.push('/');

      addToast({
        type: 'error',
        title: 'Token não enviado',
      });
    }
  }, [search, addToast, history]);

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = query.get('token');

        if (!token) {
          throw new Error();
        }

        await api.post('reset-password', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada',
          description: 'Faça o logon',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar senha, tente novamente',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, history, query],
  );

  return (
    <Container>
      <img src={logoImg} alt="Logo Finances" />

      <RightSide>
        <img src={logoImg} alt="Logo Finances" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirme a sua senha"
          />

          <Button type="submit">Enviar</Button>
        </Form>

        <DivCreateAccount>
          <Link to="/">
            <FiArrowLeft size={20} />
            Voltar ao login
          </Link>
        </DivCreateAccount>
      </RightSide>
    </Container>
  );
};

export default ResetPassword;
