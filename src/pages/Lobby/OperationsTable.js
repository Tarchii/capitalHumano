import { DatePicker, Empty, notification, Select, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import MoneyText from '../../components/MoneyText';
import styled from 'styled-components';
import moment from 'moment';
import services from '../../services';
import useAuth from '../../hooks/useAuth';
import { theme } from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import BusinessUnitTree from '../../components/BusinessUnitTree';


const OperationsTable = ({ isLoading, businessUnits, setIsLoading }) => {
    const [operations, setOperations] = useState([]);
    const [operationFilter, setOperationFilter] = useState({
        businessUnitId: businessUnits.businessUnitId,
        dateFrom: moment().subtract(1, 'days').toDate(),
        dateTo: moment().toDate(),
    });
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        count: 0,
    });
    const [summary, setSummary] = useState({
        totalOperations: 0,
        totalGrossAmount: 0,
    });
    const { user } = useAuth();
    const { RangePicker } = DatePicker;

    useEffect(() => {
        setOperationFilter({
            ...operationFilter,
            businessUnitId: businessUnits.businessUnitId,
        });
    }, [businessUnits]);

    const getPaginatedOperations = useCallback(async (pageIndex, pageSize) => {
        setIsLoading(true);
        try {
            const data = await services.orderOperations(
                {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    dateFrom: operationFilter.dateFrom,
                    dateTo: operationFilter.dateTo,
                    businessUnitId: operationFilter.businessUnitId,
                },
                user.token,);
            setPagination({
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                count: data.count,
            });
            setOperations(data.items);
            setSummary({
                totalOperations: data.totalOperations,
                totalGrossAmount: data.totalGrossAmount,
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Error al cargar las operaciones',
            });
        } finally {
            setIsLoading(false);
        }
    }, [operationFilter, user.token, setIsLoading]);


    const disabledDate = (current) => {
        return current && current.valueOf() > Date.now();
    }

    const onPaginationChange = (page, pageSize) => {
        getPaginatedOperations(page - 1, pageSize);
    }

    return (
        <div style={{ padding: 10 }}>
            <FiltersContainer>
                <FiltersWrapper>
                    <FiltersItem>
                        <FilterInputLabel>
                            Rango de fechas
                        </FilterInputLabel>
                        <RangePicker
                            format="DD-MM-YYYY HH:mm"
                            placeholder={['Fecha Inicio', 'Fecha Fin']}
                            allowClear={false}
                            defaultValue={[moment().subtract(1, 'days'), moment()]}
                            disabledDate={disabledDate}
                            style={{ width: '100%' }}
                            onChange={(dates) => {
                                setOperationFilter({
                                    ...operationFilter,
                                    dateFrom: dates[0].toDate(),
                                    dateTo: dates[1].toDate(),
                                });
                            }}
                        />
                    </FiltersItem>
                    <FiltersItem>
                        <FilterInputLabel>
                            Unidad de negocio
                        </FilterInputLabel>
                        <BusinessUnitTree
                            value={operationFilter.businessUnitId}
                            businessUnits={businessUnits}
                            onChange={value => {
                                setOperationFilter({
                                    ...operationFilter,
                                    businessUnitId: value,
                                });
                            }}
                            style={{ width: '100%' }}
                        />
                    </FiltersItem>
                    <ButtonWrapper>
                        <CustomButton loading={isLoading} onClick={() => getPaginatedOperations(pagination.pageIndex, pagination.pageSize)}>
                            Filtrar
                        </CustomButton>
                    </ButtonWrapper>
                </FiltersWrapper>
            </FiltersContainer>
            <Table
                className='table-operations'
                loading={isLoading}
                size="small"
                scroll={{ x: true }}
                locale={{ emptyText: <Empty description="No hay operaciones" /> }}
                rowKey={(r) => r.reference}
                pagination={{
                    pageSize: pagination.pageSize,
                    current: pagination.pageIndex + 1,
                    total: pagination.count,
                    onChange: onPaginationChange,
                }}
                dataSource={operations}
                columns={columnsOperations}
                footer={() => (
                    <>
                        <p><BoldFooter> Total de Operaciones: </BoldFooter> {summary?.totalOperations} </p>
                        <p><BoldFooter> Total Brutos: </BoldFooter> ${summary?.totalGrossAmount}</p>
                    </>
                )}
            />
        </div>
    )
}

const BoldFooter = styled.span`
    font-weight: bolder;
`;

const columnsOperations = [
    {
        title: 'Referencia',
        dataIndex: 'reference',
        key: 'reference',
    },
    {
        title: 'Importe Bruto',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        align: 'right',
        render: (amount) => {
            return (
                <MoneyText>{amount}</MoneyText>
            );
        },
    },
    {
        title: 'Fecha Operación',
        dataIndex: 'operationDate',
        key: 'operationDate',
        align: 'right',
        render: (date, _) => {
            return <span className="td-fit">{date.toLocaleString()}</span>;
        },
    },
    {
        title: 'Remitente',
        dataIndex: 'senderFullName',
        key: 'senderFullName',
        render: (senderFullName, _) => {
            return <span className="td-fit">{senderFullName}</span>;
        },
    },
    {
        title: 'Remitente ID',
        dataIndex: 'senderIdentity',
        key: 'senderIdentity',
    },
    {
        title: 'Croupier',
        dataIndex: 'croupier',
        key: 'croupier',
    },
    {
        title: 'Unidad de negocio',
        dataIndex: 'businessUnit',
        key: 'businessUnit',
    },
];

const FiltersContainer = styled.div`

`;

const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FiltersItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;

  @media (max-width: 600px) {
    margin: 5px 0;
  }
`;

const FilterInputLabel = styled.span`
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${theme.primary};
`;

const ButtonWrapper = styled.div`
padding-top: 20px;

@media (max-width: 600px) {
    padding: 0;
}
`;

export default OperationsTable;