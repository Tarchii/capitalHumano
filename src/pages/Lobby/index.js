import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import CustomHeader from '../../components/Header';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];
const Lobby = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          items={items}
          onClick={(item) => console.log(item)}
        />
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
          }}
        >
          <div>Bill is a cat.</div>
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
  );
};

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

export default Lobby;
