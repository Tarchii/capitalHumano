import { useState } from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';
import LoadingSpinner from '../../components/LoadingSpinner';
import { theme } from '../../utils/constants';

const SubscribedTables = ({ supervisedTables, isLoading, handleUnsubscribe }) => {
  return (
    <SubscribedTablesContainer>
      <Title>Tus mesas:</Title>
      <TablesContainer>
        {isLoading ? (<LoadingSpinner />)
          :
          supervisedTables.length === 0 ? (
            <span>No estas suscripto a ninguna mesa.</span>
          ) : (
            supervisedTables.map((table, index) => (
              <TableTag table={table} key={index} handleUnsubscribe={handleUnsubscribe} />
            ))
          )
        }
      </TablesContainer>
    </SubscribedTablesContainer>
  );
};

const SubscribedTablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: ${theme.shadow};
`;

const Title = styled.div`
  font-weight: bolder;
  text-decoration: underline;
  padding-bottom: 10px;
  font-size: 20px;
`;

const TablesContainer = styled.div`
  display: flex;
`;

const TableTag = ({ table, handleUnsubscribe }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    handleUnsubscribe(table.tableId);
  }

  return (
    <Tag
      closable
      visible={isVisible}
      onClose={handleClose}
    >
      {table.name}
    </Tag>
  );
};

export default SubscribedTables;
