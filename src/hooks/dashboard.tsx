import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { format } from 'date-fns';

import api from '../services/api';
import formatValue from '../utils/formatValues';
import { useAuth } from './auth';

interface IDatasets {
  data: number[];
  backgroundColor: string;
  label?: string;
}

export interface IIncome {
  datasets: Array<IDatasets>;
  labels: string[];
}

export interface IOutcome {
  datasets: Array<IDatasets>;
  labels: string[];
}

interface IChart {
  income: IIncome;
  outcome: IOutcome;
}

interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

export interface IMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url?: string;
  previous_page_url?: string;
}

export interface IData {
  id: number;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  created_at: Date;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
  price: string;
  data: string;
}

interface ITransactions {
  meta: IMeta;
  data: IData[];
}

interface IDashboardContextData {
  balance: IBalance;
  transactions: ITransactions;
  charts: IChart;
  setPages(pages: number): void;
  setYear(year: number): void;
  handleDeleteTransaction(id: number): Promise<void>;
  loadData(): void;
  year: number;
}

const DashboardContext = createContext<IDashboardContextData>(
  {} as IDashboardContextData,
);

const DashboardProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState<IBalance>({} as IBalance);
  const [charts, setCharts] = useState<IChart>({} as IChart);
  const [year, setYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState<ITransactions>(
    {} as ITransactions,
  );
  const [pages, setPages] = useState(1);

  const { user } = useAuth();

  const loadDataBalance = useCallback(async () => {
    const { data } = await api.get('balance');
    setBalance(data);
  }, []);

  const loadDataCharts = useCallback(async () => {
    const { data } = await api.get('charts', {
      params: {
        year,
      },
    });
    setCharts(data);
  }, [year]);

  const loadDataTransactions = useCallback(async () => {
    const { data } = await api.get<ITransactions>(`transactions`, {
      params: {
        page: pages,
      },
    });

    const arrayTransactions = data.data.map(transaction => ({
      ...transaction,
      price: formatValue(transaction.value),
      data: format(new Date(transaction.created_at), 'dd/MM/yyyy'),
    }));

    setTransactions({
      data: arrayTransactions,
      meta: data.meta,
    });
  }, [pages]);

  const loadData = useCallback(async () => {
    if (user && user.id) {
      await loadDataBalance();
      await loadDataTransactions();
      await loadDataCharts();
    }
  }, [loadDataTransactions, loadDataBalance, loadDataCharts, user]);

  const handleDeleteTransaction = useCallback(
    async (id: number) => {
      await api.delete(`/transactions/${id}`);

      loadData();
    },
    [loadData],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (user && user.id) {
      loadDataTransactions();
    }
  }, [pages, loadDataTransactions, user]);

  useEffect(() => {
    if (user && user.id) {
      loadDataCharts();
    }
  }, [year, loadDataCharts, user]);

  return (
    <DashboardContext.Provider
      value={{
        balance,
        transactions,
        setPages,
        charts,
        year,
        setYear,
        loadData,
        handleDeleteTransaction,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

function useDashboard(): IDashboardContextData {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('useDashboard must be used within as DashboardProvider');
  }

  return context;
}

export { DashboardProvider, useDashboard };
