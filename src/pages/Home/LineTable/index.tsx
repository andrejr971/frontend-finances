import React, { useCallback } from 'react';
import { FiArrowDown, FiArrowUp, FiTrash } from 'react-icons/fi';
import { IData, useDashboard } from '../../../hooks/dashboard';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface LineTableProps {
  transaction: IData;
}

const LineTable: React.FC<LineTableProps> = ({ transaction }) => {
  const { handleDeleteTransaction } = useDashboard();
  const { addToast } = useToast();

  const handleDelete = useCallback(async () => {
    await handleDeleteTransaction(transaction.id);

    addToast({
      type: 'success',
      title: 'Transação deletada',
    });
  }, [handleDeleteTransaction, transaction.id, addToast]);

  return (
    <Container>
      <td>
        <span>Título</span>
        {transaction.title}
      </td>
      <td className={transaction.type}>
        <span>Preço</span>
        <div>
          {transaction.type === 'income' ? <FiArrowUp /> : <FiArrowDown />}
          {transaction.price}
        </div>
      </td>
      <td>
        <span>Categoria</span>
        {transaction.category.name}
      </td>
      <td>
        <span>Data</span>
        {transaction.data}
      </td>
      <td>
        <button type="button" onClick={handleDelete}>
          <FiTrash />
        </button>
      </td>
    </Container>
  );
};

export default LineTable;
