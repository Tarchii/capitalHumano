import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../../components/CustomButton';
import { Input, notification } from 'antd';
import CustomModal from '../../components/CustomModal';
import { formatNumberToCurrency, theme } from '../../utils/constants';
import services from '../../services';
import useAuth from '../../hooks/useAuth';

const RequestCard = ({ request, setIsLoading, getTablesRequests }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApprovingRequest, setIsApprovingRequest] = useState(false);
  const [pin, setPin] = useState('');
  const { user } = useAuth();
  const { token } = user;

  const hour = request.creationDate.split('T')[1].split('.')[0];

  const handleOkModal = async () => {
    setIsLoading(true);
    try {
      await services.evaluateOrder({ orderRequestId: request.orderRequestId, pin: pin, isAccepted: isApprovingRequest, tableId: request.tableId }, token);
      notification.success({ message: `Solicitud ${isApprovingRequest ? 'aprobada' : 'rechazada'}  con éxito.` });
    } catch (e) {
      if (e.response.status === 400) {
        return notification.error({ message: 'Pin incorrecto', description: e.response.data });
      }
      console.error(e);
      notification.error({ message: `No fue posible ${isApprovingRequest ? 'aprobar' : 'rechazar'} la solicitud.`, description: e })
    } finally {
      getTablesRequests(token);
      setIsLoading(false);
      setIsModalVisible(false);
      setIsApprovingRequest(false);
      setPin('');
    }
  };

  const handleOnKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <RequestCardContainer>
        <Id>#{request.orderRequestId}</Id>
        <Description>
          <span style={{ overflow: 'auto' }}>{request.tableName}</span>
          <span>{request.croupier}</span>
          <span style={{ width: 70, justifyContent: 'flex-start' }}>${formatNumberToCurrency(request.amount)}</span>
          <span>{hour}</span>
        </Description>
        <ButtonsWrapper>
          <CustomButton danger onClick={() => setIsModalVisible(true)}>
            Rechazar
          </CustomButton>
          <CustomButton onClick={() => { setIsModalVisible(true); setIsApprovingRequest(true) }}>
            Aprobar
          </CustomButton>
        </ButtonsWrapper>
      </RequestCardContainer>
      <CustomModal
        title={'Solicitud #' + request.orderRequestId}
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={() => {
          setPin('');
          setIsModalVisible(false);
        }}
        okButtonProps={{
          disabled: pin.length !== 4,
        }}
      >
        <ModalDescription>
          <Subtitle>Ingrese su PIN para {isApprovingRequest ? 'aprobar' : 'rechazar'} la solicitud del croupier</Subtitle>
          <span>ID Mesa: {request.tableId}</span>
          <span>Nombre Mesa: {request.tableName}</span>
          <span>{request.croupier}</span>
          <span>${formatNumberToCurrency(request.amount)}</span>
        </ModalDescription>
        <PinWrapper>
          <PinText>Ingrese su PIN:</PinText>
          <CustomPin
            maxLength={4}
            onKeyPress={handleOnKeyPress}
            onChange={(e) => setPin(e.target.value)}
          />
        </PinWrapper>
      </CustomModal>
    </>
  );
};

const RequestCardContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-shadow: ${theme.shadow};
  justify-content: center;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

const Id = styled.div`
  font-weight: bolder;
  font-size: 25px;
`;

const Description = styled.div`
  display: flex;
  margin-left: 20px;
  font-size: 20px;
  width: 70%;
  justify-content: space-between;
  align-items: center;

  > span {
    width: 20%;
    text-align: center;

    @media (max-width: 950px) {
      width: 25%;
      padding: 10px;
    }
  }

  @media (max-width: 950px) {
    width: 100%;
  }

  @media (max-width: 650px) {
    font-size: 15px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;

    > span {
      width: 100%;
      padding: 0 5px;
    }
  }
`;

const ButtonsWrapper = styled.div`
  margin-left: auto;
  width: 30%;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 950px) {
    margin-top: 15px;
    width: 100%;
  }
`;

const ModalDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.span`
font-weight: bold;
font-size: 16px;
`;

const PinWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const PinText = styled.div`
  font-size: 18px;
  font-weight: bolder;
`;

const CustomPin = styled(Input.Password)`
  width: 115px;
  font-size: 15px;

  input {
    font-size: 30px;
    font-weight: bolder;
  }
`;

export default RequestCard;
