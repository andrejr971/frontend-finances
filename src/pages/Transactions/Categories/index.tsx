/* eslint-disable prettier/prettier */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiSave } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useToast } from '../../../hooks/toast';
import { useTransactions } from '../../../hooks/transactions';
import Card from './Card';
import getValidationErrors from '../../../utils/getValidationsErrors';

import { Container, Content } from './styles';

interface IRequest {
  name: string;
}

const Categories: React.FC = () => {
  
  const formRef = useRef<FormHandles>(null);
  
  const { addToast } = useToast();
  const { categories, handleAddCatgegory } = useTransactions();

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await handleAddCatgegory(data.name);

        addToast({
          type: 'success',
          title: 'Categoria adicionada',
        });

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar',
        });
      }
    },
    [ handleAddCatgegory, addToast],
  );

  return (
    <Container>
      <h1>Minhas Categorias</h1>

      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="name" placeholder="Nome da categoria" />
        <Button type="submit">
          <FiSave />
        </Button>
      </Form>


      <Content>
        {categories.length > 0
          ? categories.map(category => (
            <Card key={category.id} category={category} />
            ))
          : ''}
      </Content>
    </Container>
  );
};

export default Categories;
