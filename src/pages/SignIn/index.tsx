import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/icon.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  DivCreateAccount,
  Container,
  RightSide,
  ForgotPassword,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface IRequest {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Logado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, cheque as suas credenciais',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <img src={logoImg} alt="Logo Finances" />

      <RightSide>
        <img src={logoImg} alt="Logo Finances" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <ForgotPassword>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </ForgotPassword>
        </Form>

        <DivCreateAccount>
          <Link to="/register">
            <FiLogIn size={20} />
            Criar conta
          </Link>
        </DivCreateAccount>
      </RightSide>
    </Container>
  );
};

export default SignIn;
