import React, { useMemo, useCallback, useEffect } from 'react';
import Select from 'react-select';
import {
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiDollarSign,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { useDashboard } from '../../hooks/dashboard';
import formatValue from '../../utils/formatValues';
import Charts from './Charts';
import LineTable from './LineTable';

import {
  Container,
  ContentCards,
  Card,
  Main,
  Article,
  Content,
  ContentEmpty,
} from './styles';

interface IOptions {
  value: number;
  label: string;
}

const Home: React.FC = () => {
  const {
    balance,
    transactions,
    setPages,
    charts,
    setYear,
    year,
  } = useDashboard();

  const options = useMemo<IOptions[]>(() => {
    const data: IOptions[] = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 2020; index <= year; index++) {
      data.push({
        value: index,
        label: String(index),
      });
    }

    return data;
  }, [year]);

  const handleSelect = useCallback(
    data => {
      setYear(data.value);
    },
    [setYear],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <ContentCards>
        <Card type="income">
          <span>
            Entradas
            <FiArrowUpCircle />
          </span>
          <strong>{formatValue(balance.income)}</strong>
        </Card>

        <Card type="outcome">
          <span>
            Saídas
            <FiArrowDownCircle />
          </span>
          <strong>{formatValue(balance.outcome)}</strong>
        </Card>

        <Card type="total">
          <span>
            Total
            <FiDollarSign />
          </span>
          <strong>{formatValue(balance.total)}</strong>
        </Card>
      </ContentCards>

      <Main>
        {transactions.data && transactions.data.length === 0 ? (
          <ContentEmpty>
            <p>Nenhuma Transação feita</p>
            <Link to="/transactions">
              Clique aqui para realizar uma transação
            </Link>
          </ContentEmpty>
        ) : (
          <>
            <Article>
              <header>
                <Select
                  defaultValue={
                    options[
                      options.findIndex(
                        value => value.value === new Date().getFullYear(),
                      )
                    ]
                  }
                  onChange={handleSelect}
                  options={options}
                  className="select"
                  label="Escolha um ano"
                  classNamePrefix="select"
                />
              </header>
              <Content>
                {charts.income && <Charts data={charts.income} />}
                {charts.outcome && <Charts data={charts.outcome} />}
              </Content>
            </Article>

            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th>#</th>
                </tr>
              </thead>

              <tbody>
                {transactions.data &&
                  transactions.data.map(transaction => (
                    <LineTable transaction={transaction} key={transaction.id} />
                  ))}
              </tbody>
            </table>

            {transactions.meta && (
              <Pagination meta={transactions.meta} setPages={setPages} />
            )}
          </>
        )}
      </Main>
    </Container>
  );
};

export default Home;
