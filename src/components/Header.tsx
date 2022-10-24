import { Dropdown, Menu, Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import userImage from '../assets/img/userImage.png';
import useAuth from '../hooks/useAuth';

const Header: React.FC = () => {
  const { logout, user } = useAuth();

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Button type="text" onClick={logout}>
              Cerrar sesión
            </Button>
          ),
        },
      ]}
    />
  );

  return (
    <HeaderContainer>
      <ImageWrapper>
        <img src={'https://cdn.onlinewebfonts.com/svg/img_215664.png'} alt="logo" />
      </ImageWrapper>
      <Dropdown overlay={menu}>
        <User>
          <UserName>
            {user.username}
          </UserName>
          <UserImage>
            <img src={userImage} alt="user" />
          </UserImage>
        </User>
      </Dropdown>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #efefef;
  border-radius: 0 0 10px 10px;
  width: 100%;
  padding: 15px;
`;

const ImageWrapper = styled.div`
  img {
    width: 80px;
  }
`;

const User = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-weight: bolder;
`;

const UserImage = styled.div`
  margin-left: 10px;

  img {
    width: 40px;
    vertical-align: middle;
    border-style: none;
    border-radius: 50%;
  }
`;

export default Header;
