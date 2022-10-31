import {
    PieChartOutlined,
    SettingOutlined,
    BarsOutlined,
    UserOutlined,
    HeartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomHeader from '../../components/Header';
const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     };
// }
// const items = [
//     getItem('Option 1', '1', <PieChartOutlined />),
//     getItem('Option 2', '2', <DesktopOutlined />),
//     getItem('User', 'sub1', <UserOutlined />, [
//         getItem('Tom', '3'),
//         getItem('Bill', '4'),
//         getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'sub2', <TeamOutlined />, [
//         getItem('Team 1', '6'),
//         getItem('Team 2', '8'),
//     ]),
//     getItem('Files', '9', <FileOutlined />),
// ];

const AppLayout = ({ isLoading, children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                theme="dark"
            >
                <ImageWrapper>
                    <img
                        src={'https://cdn.onlinewebfonts.com/svg/img_215664.png'}
                        alt='logo'
                    />
                </ImageWrapper>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    activeKey={window.location.pathname}
                    selectedKeys={[window.location.pathname]}
                >
                    <Menu.Item key='/lobby' icon={<BarsOutlined />} onClick={() => navigate('/lobby')}>
                        Lobby
                    </Menu.Item>
                    <Menu.Item key='/employees' icon={<UserOutlined />} onClick={() => navigate('/employees')}>
                        Empleados
                    </Menu.Item>
                    <Menu.Item key='/members' icon={<HeartOutlined />} onClick={() => navigate('/members')}>
                        Integrantes
                    </Menu.Item>
                    <Menu.Item key='/reports' icon={<PieChartOutlined />} onClick={() => navigate('/reports')}>
                        Informes
                    </Menu.Item>
                    <Menu.ItemGroup title={"Administración"}>
                        <Menu.Item key='/areas' icon={<SettingOutlined />} onClick={() => navigate('/areas')}>
                            Áreas
                        </Menu.Item>
                        <Menu.Item key='/sindicatos' icon={<SettingOutlined />} onClick={() => navigate('/sindicatos')}>
                            Sindicatos
                        </Menu.Item>
                        <Menu.Item key='/obraSocial' icon={<SettingOutlined />} onClick={() => navigate('/obraSocial')}>
                            Obras Sociales
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        backgroundColor: '#fff',
                        padding: 0,
                    }}
                >
                    <CustomHeader />
                </Header>
                <Content
                    style={{
                        padding: 20,
                        marginTop: 10,
                    }}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Software de Gestión de Capital Humano ©2022
                </Footer>
            </Layout>
        </Layout>
    )
}

const ImageWrapper = styled.div`
height: 50px;
margin: 16px;
background: rgba(255, 255, 255, 0.3);
display: flex;
align-items: center;
justify-content: center;

img {
  width: 32px;
  margin: 10px;
}
`;

export default AppLayout;

