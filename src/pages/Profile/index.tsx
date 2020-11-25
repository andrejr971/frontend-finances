import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiMail, FiEdit2, FiSave, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { useAuth, IRequestProfile } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationsErrors';

import InputImage from '../../components/InputImage';

import {
  Container,
  Main,
  FooterForm,
  DivPassword,
  GroupInputs,
} from './styles';

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateImage, updateProfile } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IRequestProfile) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().required('E-mail é obrigatório'),
          old_password: Yup.string(),
          password: Yup.string(),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await updateProfile(data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso!',
        });

        formRef.current?.clearField('old_password');
        formRef.current?.clearField('password');
        formRef.current?.clearField('password_confirmation');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description: 'Ocorreu um erro, tente novamente',
        });
      }
    },
    [addToast, updateProfile],
  );

  const handleImageProfile = useCallback(
    async (file: File) => {
      await updateImage(file);

      addToast({
        type: 'success',
        title: 'Image alterada!',
      });
    },
    [addToast, updateImage],
  );

  return (
    <Container>
      <Main>
        <Form onSubmit={handleSubmit} initialData={user} ref={formRef}>
          <InputImage
            imageURL={user.avatar?.url}
            onFileUploaded={handleImageProfile}
            isProfile
          />

          <GroupInputs>
            <Input type="text" name="name" placeholder="Nome" icon={FiEdit2} />
            <Input
              type="text"
              name="last_name"
              placeholder="Último Nome"
              icon={FiEdit2}
            />
          </GroupInputs>
          <Input type="email" name="email" placeholder="E-mail" icon={FiMail} />

          <DivPassword>
            <hr />
            <Input
              type="password"
              name="old_password"
              placeholder="Senha antiga"
              icon={FiLock}
            />
            <Input
              type="password"
              name="password"
              placeholder="Nova senha"
              icon={FiLock}
            />
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Confirme sua senha"
              icon={FiLock}
            />
          </DivPassword>

          <FooterForm>
            <Button type="submit">
              <span>Salvar</span>
              <FiSave />
            </Button>
          </FooterForm>
        </Form>
      </Main>
    </Container>
  );
};

export default Profile;
