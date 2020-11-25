import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/icon.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationsErrors';
import { useToast } from '../../hooks/toast';

import { DivCreateAccount, Container, RightSide } from './styles';
import { useAuth } from '../../hooks/auth';

export interface IRequestCreateUser {
  name: string;
  last_name?: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { signUp } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: IRequestCreateUser) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          last_name: Yup.string(),
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

        await signUp(data);

        addToast({
          type: 'success',
          title: 'Usuário criado',
          description: 'Agora efetue o login para continuar',
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
          title: 'Erro no cadatro',
          description:
            'Ocorreu um erro ao fazer cadatro, cheque as suas informações',
        });
      }
    },
    [signUp, addToast, history],
  );

  return (
    <Container>
      <img src={logoImg} alt="Logo Finances" />

      <RightSide>
        <img src={logoImg} alt="Logo Finances" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" icon={FiUser} placeholder="Primeiro nome" />
          <Input name="last_name" icon={FiUser} placeholder="Último nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
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

export default SignUp;
