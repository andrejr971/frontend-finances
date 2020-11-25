import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationsErrors';

import logoImg from '../../assets/icon.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container } from './styles';
import api from '../../services/api';

import { DivCreateAccount, RightSide } from '../SignUp/styles';

interface IRequest {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`forgot-password`, {
          email: data.email,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail de recuperação de senha, verifique a sua caixa de entrada, ou no span',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao enviar o e-mail',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <img src={logoImg} alt="Logo Finances" />

      <RightSide>
        <img src={logoImg} alt="Logo Finances" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />

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

export default ForgotPassword;
