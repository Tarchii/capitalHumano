import { Tabs } from 'antd';
import styled from 'styled-components';
import { OrderedListOutlined, PullRequestOutlined, UnorderedListOutlined } from '@ant-design/icons';
import SubscribedTables from './SubscribedTables';
import FreeTables from './FreeTables';
import RequestsList from './RequestsList';
import services from '../../services';
import { notification } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { subscribe, unSubscribe } from '../../services/SignalR/Notify';
import OperationsTable from './OperationsTable';

const { TabPane } = Tabs;

const defaultBusinessUnits = {
  id: 0,
  name: '',
  childUnits: [],
}

const SupervisorLobby = ({ user }) => {
  const [supervisedTables, setSupervisedTables] = useState([]);
  const [unSupervisedTables, setUnSupervisedTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [businessUnits, setBusinessUnits] = useState({ defaultBusinessUnits });
  const [requests, setRequests] = useState([]);
  const { token } = user;

  const getTables = useCallback(async () => {
    setIsLoading(true);
    try {
      let data = await services.getSupervisorAvailableTables(token);
      setSupervisedTables(data.supervised);
      setUnSupervisedTables(data.unsupervised);
    } catch (error) {
      console.error(error);
      notification.error({ message: 'No fue posible traer las mesas.', description: error })
    }
    finally {
      setIsLoading(false);
    }
  }, [token]);

  const getBusinessUnits = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await services.getBusinessUnits(token);
      setBusinessUnits(data.defaultBusinessUnit);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTables();
    if (user.editPermission) {
      getBusinessUnits();
    }
  }, [getTables]);

  const handle = (payload) => {
    getTables();
  }

  useEffect(() => {
    subscribe({ channel: 'tableTaken', handle });
    subscribe({ channel: 'tableFreed', handle });
    subscribe({ channel: 'tableUpdated', handle });

    return () => {
      unSubscribe({ channel: 'tableTaken', handle });
      unSubscribe({ channel: 'tableFreed', handle });
      unSubscribe({ channel: 'tableUpdated', handle });

    }
  });

  const handleUnsubscribe = async (tableId) => {
    setIsLoading(true);
    try {
      let data = await services.unSubscribeSupervisor({ tableId }, token);
      setSupervisedTables(data.supervised);
      setUnSupervisedTables(data.unsupervised);
      notification.success({ message: 'Se ha desuscrito de la mesa correctamente.' });
    } catch (error) {
      console.error(error);
      notification.error({ message: 'No fue posible desuscribirse de la mesa.', description: error })
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSubscribe = async (tableId) => {
    setIsLoading(true);
    try {
      let data = await services.subscribeSupervisor({ tableId }, token);
      setSupervisedTables(data.supervised);
      setUnSupervisedTables(data.unsupervised);
      getTablesRequests();
      notification.success({ message: 'Se ha suscrito a la mesa correctamente.' });
    } catch (error) {
      console.error(error);
      notification.error({ message: 'No fue posible suscribirse a la mesa.', description: error })
    }
    finally {
      setIsLoading(false);
    }
  }

  const getTablesRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await services.getTablesRequests(user.token);
      setRequests(data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)));
    } catch (error) {
      console.error(error);
      notification.error({ message: 'No fue posible traer las solicitudes.', description: error })
    }
    finally {
      setIsLoading(false);
    }
  }, [user.token]);

  return (
    <Container>
      <Tabs defaultActiveKey='1'>
        <TabPane
          tab={
            <span>
              <OrderedListOutlined /> Lobby
            </span>
          }
          key='1'
        >
          <SubscribedTables supervisedTables={supervisedTables} isLoading={isLoading} handleUnsubscribe={handleUnsubscribe} />
          <FreeTables user={user} tables={unSupervisedTables} isLoading={isLoading} setIsLoading={setIsLoading} handleSubscribe={handleSubscribe} getTables={getTables} businessUnits={businessUnits} token={token} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <PullRequestOutlined /> Solicitudes
            </span>
          }
          key='2'
          forceRender
        >
          <RequestsList supervisedTables={supervisedTables} getTablesRequests={getTablesRequests} requests={requests} setRequests={setRequests} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <UnorderedListOutlined /> Operaciones
            </span>
          }
          key='3'
          forceRender
        >
          <OperationsTable isLoading={isLoading} setIsLoading={setIsLoading} businessUnits={businessUnits} />
        </TabPane>
      </Tabs>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
`;

export default SupervisorLobby;
