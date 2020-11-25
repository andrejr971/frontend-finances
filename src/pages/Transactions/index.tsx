import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTransactions } from '../../hooks/transactions';
import Categories from './Categories';
import NewTransaction from './NewTransaction';

import { Container } from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Transactions: React.FC = () => {
  const query = useQuery();
  const { loadCategories, categories } = useTransactions();

  const type = useMemo(() => query.get('type') || 'new-transaction', [query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      loadCategories();
    }
  }, [loadCategories, categories]);

  return (
    <Container>
      <header>
        <nav>
          <Link
            to="/transactions?type=new-transaction"
            className={type === 'new-transaction' ? 'active' : ''}
          >
            Transações
          </Link>
          <Link
            to="/transactions?type=categories"
            className={type === 'categories' ? 'active' : ''}
          >
            Categorias
          </Link>
        </nav>
      </header>

      <main>
        {type === 'new-transaction' ? <NewTransaction /> : <Categories />}
      </main>
    </Container>
  );
};

export default Transactions;
