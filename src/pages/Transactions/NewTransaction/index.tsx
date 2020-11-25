import React, { useCallback, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { MdTitle } from 'react-icons/md';
import { FiAlertCircle, FiDollarSign } from 'react-icons/fi';
import CurrencyInput from 'react-currency-input-field';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import RadioBox from '../../../components/RadioBox';
import ReactSelect from '../../../components/ReactSelect';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationsErrors';
import { useTransactions } from '../../../hooks/transactions';

import { Container, ContainerCurrent, Error } from './styles';

interface IRequest {
  title: string;
  type: ['income' | 'outcome'];
  category: string;
}

const NewTransaction: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('');
  const [error, setError] = useState('');
  const [clean, setClean] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { handleAddTransaction, categories } = useTransactions();

  const handleSubmit = useCallback(
    async (data: IRequest) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Nome obrigatório'),
          category: Yup.string().required('Categoria obrigatória'),
        });

        if (!value) {
          setError('Valor obrigatório');
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const { title, category, type } = data;

        await handleAddTransaction({
          title,
          category,
          type: type[0],
          value: Number(value?.toString().replace(/,/g, '.')),
        });

        addToast({
          type: 'success',
          title: 'Transação adicionada',
        });

        formRef.current?.reset();
        setValue('');
        setClean(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na transação',
          description: 'Ocorreu um erro ao efetuar transação',
        });
      }
    },
    [value, handleAddTransaction, addToast],
  );

  return (
    <Container>
      <h1>Nova Transação</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="title" placeholder="Nome" icon={MdTitle} />
        <ContainerCurrent isErrored={!!error} isFilled={!!value} id="current">
          <FiDollarSign />
          <CurrencyInput
            name="value"
            placeholder="Valor"
            decimalSeparator=","
            groupSeparator=""
            value={value}
            onChange={data => setValue(data)}
            autoComplete="off"
          />

          {error && (
            <Error title={error}>
              <FiAlertCircle size={20} />
            </Error>
          )}
        </ContainerCurrent>
        <RadioBox name="type" clean={clean} setClean={setClean} />
        <ReactSelect
          name="category"
          placeholder="Categoria"
          options={categories.map(category => ({
            label: category.name,
            value: category.name,
          }))}
        />

        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default NewTransaction;
