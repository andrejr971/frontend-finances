import { format } from 'date-fns';
import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import { useDashboard } from './dashboard';

interface IRequest {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export interface ICategory {
  id: number;
  name: string;
  created_at: Date;
  data: string;
}

interface ITransactionsContextData {
  handleAddTransaction(data: IRequest): Promise<void>;
  loadCategories(): Promise<void>;
  handleAddCatgegory(name: string): Promise<void>;
  categories: ICategory[];
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData,
);

const TransactionProvider: React.FC = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { loadData } = useDashboard();

  const handleAddTransaction = useCallback(
    async (data: IRequest) => {
      await api.post(`/transactions`, data);
      loadData();
    },
    [loadData],
  );

  const handleAddCatgegory = useCallback(
    async (name: string) => {
      const { data } = await api.post(`/categories`, { name });

      const arrayCategories = categories;

      arrayCategories.push({
        id: data.id,
        name: data.name,
        created_at: data.created_at,
        data: format(new Date(data.created_at), 'dd/MM/yyyy'),
      });

      setCategories(arrayCategories);
    },
    [categories],
  );

  const loadCategories = useCallback(async () => {
    const { data } = await api.get('categories');

    setCategories(
      data.map((category: Omit<ICategory, 'data'>) => ({
        id: category.id,
        name: category.name,
        created_at: category.created_at,
        data: format(new Date(category.created_at), 'dd/MM/yyyy'),
      })),
    );
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        handleAddTransaction,
        loadCategories,
        categories,
        handleAddCatgegory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

function useTransactions(): ITransactionsContextData {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionProvider',
    );
  }

  return context;
}

export { useTransactions, TransactionProvider };
