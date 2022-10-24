import { Tabs } from 'antd';
import styled from 'styled-components';
import { OrderedListOutlined } from '@ant-design/icons';
import FreeTables from './FreeTables';
import services from '../../services';
import { useState, useEffect, useCallback } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { subscribe, unSubscribe } from '../../services/SignalR/Notify';

const { TabPane } = Tabs;

const CroupierLobby = ({ user }) => {
  const [freeTables, setFreeTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = user;

  const isSubscribed = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await services.isCroupierSubscribed(token);
      if (data.isSubscribed) {
        navigate('/table/' + data.tableId);
      }
    } catch (e) {
      console.error(e);
      notification.error('Error', e.message);
    }
    setIsLoading(false);
  }, [token, navigate]);

  useEffect(() => {
    isSubscribed();
  }, [isSubscribed]);

  const getTables = useCallback(async () => {
    setIsLoading(true);
    try {
      let data = await services.getCroupierAvailableTables(token);
      setFreeTables(data);
    } catch (error) {
      notification.error({ message: 'No fue posible traer las mesas.', description: error })
    }
    finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getTables();
  }, [getTables]);

  const handle = (payload) => {
    getTables();
  }

  useEffect(() => {
    subscribe({ channel: 'tableTaken', handle });
    subscribe({ channel: 'tableFreed', handle });
    subscribe({ channel: 'tableSubscription', handle });
    subscribe({ channel: 'tableUnsubscription', handle });
    subscribe({ channel: 'tableUpdated', handle });

    return () => {
      unSubscribe({ channel: 'tableTaken', handle });
      unSubscribe({ channel: 'tableFreed', handle });
      unSubscribe({ channel: 'tableSubscription', handle });
      unSubscribe({ channel: 'tableUnsubscription', handle });
      unSubscribe({ channel: 'tableUpdated', handle });
    }
  });

  const handleEnterTable = async (tableId) => {
    setIsLoading(true);
    try {
      await services.subscribeCroupier({ tableId }, token);
      navigate('/table/' + tableId);
    } catch (error) {
      console.error(error);
      notification.error({ message: 'No fue posible entrar a la mesa.', description: error })
    } finally {
      setIsLoading(false);
    }
  }

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
          <FreeTables user={user} tables={freeTables} isLoading={isLoading} setIsLoading={setIsLoading} handleSubscribe={handleEnterTable} />
        </TabPane>
      </Tabs>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
`;

export default CroupierLobby;
