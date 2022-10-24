import React from 'react';
import CustomButton from './CustomButton';
import styled, { css } from 'styled-components';
import { ITable } from '../services/interfaces';
import { theme } from '../utils/constants';
import LoadingSpinner from './LoadingSpinner';
import { AppData } from '../context/ApplicationContext';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Popconfirm } from 'antd';

interface TableCardProps {
  table: ITable;
  user: AppData;
  handleSubscribe: (tableId: number) => void;
  isLoading: boolean;
  onEditing: (table: ITable) => void;
  handleStateTable: (id: number, isEnabled: boolean) => void;
}

const TableCard: React.FC<TableCardProps> = ({
  table,
  user,
  handleSubscribe,
  isLoading,
  onEditing,
  handleStateTable,
}) => {
  const tableOptions = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Button
              type="text"
              onClick={() => onEditing(table)}
            // disabled={!user.editPermission}
            >
              Editar Mesa
            </Button>
          ),
        },
        {
          key: '2',
          label: (
            <Popconfirm
              title={`¿Seguro que quieres ${table.isEnabled ? 'deshabilitar' : 'habilitar'
                }  esta mesa?`}
              onConfirm={() =>
                handleStateTable(table.tableId, !table.isEnabled)
              }
              okText="Aceptar"
              cancelText="Cancelar"
              placement="topLeft"
            >
              <Button type="text"
              // disabled={!user.editPermission}
              >
                {table.isEnabled ? 'Deshabilitar' : 'Habilitar'} Mesa
              </Button>
            </Popconfirm>
          ),
        },
      ]}
    />
  );

  return (
    <CardContainer
      isDisabled={false}
    >
      <CardHeader>
        <TableName>{table.name}</TableName>
        <RightWrapper>
          <CustomButton
            style={{ marginLeft: 'auto', marginRight: 20 }}
            onClick={() => {
              handleSubscribe(table.tableId);
            }}
          // disabled={user.role === 'supervisor' && !table.isEnabled}
          >
            {isLoading ? (
              <LoadingSpinner style={{ color: 'white' }} />
            ) : user.username === 'admin' ? (
              'Suscribirse'
            ) : (
              'Entrar'
            )}
          </CustomButton>
          {user.username === 'admin' && (
            <>
              <Dropdown overlay={tableOptions}>
                <MoreOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
              </Dropdown>
            </>
          )}
        </RightWrapper>
      </CardHeader>
      {user.username === 'admin' &&
        (table.croupiers?.length === 0 ? (
          <Croupiers>Esta mesa no tiene Croupiers asignados.</Croupiers>
        ) : (
          <Croupiers>
            <span style={{ fontSize: 20, marginLeft: 20 }}>Croupiers:</span>
            {table.croupiers?.map((croupierName, index) => (
              <CroupierName key={index}>{croupierName}</CroupierName>
            ))}
          </Croupiers>
        ))}
      {user.username === 'default' && !table.isAnySupervisorSubscribed && (
        <NoSupervisor>No hay Supervisores suscriptos a esta mesa.</NoSupervisor>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div<{ isDisabled: boolean }>`
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  box-shadow: ${theme.shadow};

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      box-shadow: none;
    `}
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const TableName = styled.div`
  font-weight: bolder;
  font-size: 25px;
  margin-left: 25px;

  @media (max-width: 400px) {
    font-size: 18px;
  }
`;

const Croupiers = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const NoSupervisor = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const CroupierName = styled.div`
  margin-left: 10px;
  border-radius: 5px;
  background-color: #efefef;
  padding: 3px;
  font-size: 10px;
  margin-top: 5px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default TableCard;
