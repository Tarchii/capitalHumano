import { Tabs } from 'antd';
import styled from 'styled-components';
import AppLayout from '../../components/layout/AppLayout';
import TableEmployees from './TableEmployees';
import { useState } from 'react';

const Employees = () => {
    const [isTabDisabled, setIsTabDisabled] = useState(true);

    return (
        <AppLayout>
            <Container>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Tabla Empleados" key="1">
                        <TableEmployees />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Detalles Empleado" key="2" disabled={isTabDisabled}>
                        Content of Tab Pane 2
                    </Tabs.TabPane>
                </Tabs>
            </Container>
        </AppLayout>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
`;

export default Employees;