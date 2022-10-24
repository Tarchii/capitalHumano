import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatNumberToCurrency, theme } from '../../utils/constants';
import { notification } from 'antd';
import RequestCard from './RequestCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { subscribe, unSubscribe } from '../../services/SignalR/Notify';

const RequestsList = ({ supervisedTables, getTablesRequests, requests, setRequests }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTablesRequests();
  }, [getTablesRequests]);


  const handleOrderCreated = (payload) => {
    if (supervisedTables.map((table) => table.tableId === payload.tableId).includes(true)) {
      getTablesRequests();
      notification.info({ message: 'Nueva solicitud', description: `${payload.croupier} por $${formatNumberToCurrency(payload.amount)} en ${payload.tableName}`, duration: 10 });
    }
  }

  const handle = (payload) => {
    getTablesRequests();
  }

  useEffect(() => {
    subscribe({ channel: 'orderCreated', handle: handleOrderCreated });
    subscribe({ channel: 'orderCancelled', handle });
    subscribe({ channel: 'orderRejected', handle });
    subscribe({ channel: 'orderApproved', handle });

    return () => {
      unSubscribe({ channel: 'orderCreated', handle: handleOrderCreated });
      unSubscribe({ channel: 'orderCancelled', handle });
      unSubscribe({ channel: 'orderRejected', handle });
      unSubscribe({ channel: 'orderApproved', handle });
    }
  });

  return (
    <RequestsListContainer>
      {isLoading ? <LoadingSpinner /> :
        requests.length === 0 ? (
          <NoRequests>No hay solicitudes activas actualmente</NoRequests>
        ) : (
          requests.map((request, index) => (
            <RequestCard request={request} key={index} setIsLoading={setIsLoading} getTablesRequests={getTablesRequests} />
          ))
        )
      }
    </RequestsListContainer>
  );
};

const RequestsListContainer = styled.div`
  background-color: #efefef;
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${theme.shadow};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NoRequests = styled.div`
  font-size: 25px;
  font-weight: bolder;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export default RequestsList;
