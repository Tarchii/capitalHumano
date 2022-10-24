import styled from 'styled-components';
import CustomButton from '../../components/CustomButton';
import TableCard from '../../components/TableCard';
import { theme } from '../../utils/constants';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useEffect, useMemo, useState } from 'react';
import CustomModal from '../../components/CustomModal';
import { Input, InputNumber, notification, Tooltip } from 'antd';
import services from '../../services';
import BusinessUnitTree from '../../components/BusinessUnitTree';
import { InfoCircleOutlined } from '@ant-design/icons';

const initialTableValues = {
  tableId: 0,
  name: '',
  businessUnitId: 'Seleccione una unidad de negocio',
  amounts: [5000, 10000, 20000, 30000],
  isEnabled: true,
  croupiers: [],
};

const FreeTables = ({
  user,
  tables,
  isLoading,
  handleSubscribe,
  getTables,
  setIsLoading,
  businessUnits,
  token,
}) => {
  const [handleTableModal, setHandleTableModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tableInModal, setTableInModal] = useState(initialTableValues);

  const differentAmounts = useMemo(() =>
    tableInModal.amounts.every((value, index, list) => (list.indexOf(value) === index)), [tableInModal.amounts]);

  const handleOkModal = async () => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await services.updateTable(
          {
            tableId: tableInModal.tableId,
            name: tableInModal.name,
            businessUnitId: tableInModal.businessUnitId,
            amounts: tableInModal.amounts,
          },
          token
        );
        notification.success({
          message: 'Mesa actualizada',
          description: 'La mesa se actualizó correctamente',
        });
      } else {
        const data = await services.createNewTable({
          name: tableInModal.name,
          businessUnitId: tableInModal.businessUnitId,
          amounts: tableInModal.amounts,
          isEnabled: tableInModal.isEnabled,
        }, token);
        notification.success({
          message: `Mesa creada con ID ${data.tableId}`,
          description: data.message,
        });
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        notification.warning({
          message: '¡Cuidado!',
          description: error.response.data,
        });
      } else {
        notification.error({
          message: 'Error al crear mesa',
          description: 'Hubo un error al crear la mesa',
        });
      }
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setHandleTableModal(false);
      setTableInModal(initialTableValues);
      getTables();
    }
  };

  const onEditing = (table) => {
    setTableInModal(table);
    setHandleTableModal(true);
    setIsEditing(true);
  };

  const handleStateTable = async (tableId, isEnabled) => {
    try {
      await services.changeTableState(
        { tableId: tableId, isEnabled: isEnabled },
        user.token
      );
      getTables();
      notification.success({ message: 'Cambio de estado de la mesa exitoso.' });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'No fue posible cambiar el estado de la mesa.',
        description: error,
      });
    }
  };

  return (
    <FreeTablesContainer>
      <TitleAndButtonWrapper>
        <Title>Mesas Libres:</Title>
        {user.role === 'supervisor' && (
          <TooltipAndButton>
            {!user.editPermission &&
              <Tooltip trigger={['hover', 'click']} title="No tienes los permisos para crear una mesa.">
                <InfoCircleOutlined style={{ color: theme.primary, display: 'flex', alignItems: 'center', marginRight: 5, marginBottom: 20 }} />
              </Tooltip>
            }
            <CustomButton
              style={{ marginLeft: 'auto', marginRight: 70, marginBottom: 20 }}
              onClick={() => setHandleTableModal(true)}
              disabled={!user.editPermission}
            >
              Crear Mesa
            </CustomButton>
          </TooltipAndButton>
        )}
      </TitleAndButtonWrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FreeTablesWrapper>
          {tables.map((table, index) => (
            <TableCard
              key={index}
              table={table}
              user={user}
              handleSubscribe={handleSubscribe}
              isLoading={isLoading}
              onEditing={onEditing}
              handleStateTable={handleStateTable}
            />
          ))}
        </FreeTablesWrapper>
      )}
      <CustomModal
        title={isEditing ? 'Editar Mesa' : 'Crear Mesa'}
        visible={handleTableModal}
        onOk={handleOkModal}
        okButtonProps={{ disabled: (isLoading || tableInModal.name === '' || !differentAmounts) }}
        onCancel={() => {
          setHandleTableModal(false);
          setIsEditing(false);
          setTableInModal(initialTableValues);
        }}
      >
        <ModalSubtitle>Nombre de la mesa:</ModalSubtitle>
        <Input
          name="Name"
          onChange={(e) =>
            setTableInModal({ ...tableInModal, name: e.target.value })
          }
          value={tableInModal.name}
          maxLength={50}
        />
        <ModalSubtitle>Unidad de negocio:</ModalSubtitle>
        <BusinessUnitTree
          value={tableInModal.businessUnitId}
          businessUnits={businessUnits}
          onChange={(e) => {
            setTableInModal({ ...tableInModal, businessUnitId: e });
          }}
        />
        <ModalSubtitle>Valores de las tarjetas:</ModalSubtitle>
        <InputNumberWrapper>
          <InputNumber
            value={tableInModal.amounts[0]}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={(value) =>
              setTableInModal({
                ...tableInModal,
                amounts: [
                  value,
                  tableInModal.amounts[1],
                  tableInModal.amounts[2],
                  tableInModal.amounts[3],
                ],
              })
            }
          />
          <InputNumber
            value={tableInModal.amounts[1]}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={(value) =>
              setTableInModal({
                ...tableInModal,
                amounts: [
                  tableInModal.amounts[0],
                  value,
                  tableInModal.amounts[2],
                  tableInModal.amounts[3],
                ],
              })
            }
          />
          <InputNumber
            value={tableInModal.amounts[2]}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={(value) =>
              setTableInModal({
                ...tableInModal,
                amounts: [
                  tableInModal.amounts[0],
                  tableInModal.amounts[1],
                  value,
                  tableInModal.amounts[3],
                ],
              })
            }
          />
          <InputNumber
            value={tableInModal.amounts[3]}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={(value) =>
              setTableInModal({
                ...tableInModal,
                amounts: [
                  tableInModal.amounts[0],
                  tableInModal.amounts[1],
                  tableInModal.amounts[2],
                  value,
                ],
              })
            }
          />
        </InputNumberWrapper>
        {
          !differentAmounts && <ErrorText>Los valores de las tarjetas deben ser diferentes.</ErrorText>
        }
      </CustomModal>
    </FreeTablesContainer>
  );
};

const FreeTablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${theme.shadow};
`;

const Title = styled.div`
  font-weight: bolder;
  text-decoration: underline;
  padding-bottom: 10px;
  font-size: 20px;
`;

const TooltipAndButton = styled.div`
display: flex;
`;

const TitleAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FreeTablesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ModalSubtitle = styled.h2`
  margin-top: 10px;
`;

const InputNumberWrapper = styled.div`
  & > div {
    margin-right: 20px;
  }

  @media (max-width: 544px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
      margin-right: 0px;
      margin-bottom: 10px;
    }
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

export default FreeTables;
