import styled from 'styled-components';
import { Button, Form, Input, notification } from 'antd';
import { UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
import { theme } from '../../utils/constants';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomModal from '../../components/CustomModal';
import useAuth from '../../hooks/useAuth';
import { IOnForgotPassword } from '../../services/interfaces';
import services from '../../services';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailModal, setEmailModal] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const { login } = useAuth();

  interface IOnFinish {
    userName: string;
    password: string;
  }

  const onFinish = (form: IOnFinish) => {
    setIsLoading(true);
    try {
      login(form.userName, form.password);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Usuario o contraseña incorrectos',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnForgotPassword = async (values: IOnForgotPassword) => {};

  return (
    <>
      <LoginCard>
        <LogoContainer>
          <img
            src={'https://cdn.onlinewebfonts.com/svg/img_215664.png'}
            alt='Logo'
          />
        </LogoContainer>
        <Title>Gestión de Capital Humano</Title>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Form.Item
            name='userName'
            rules={[
              {
                required: true,
                message: 'Ingresa un usuario',
              },
            ]}
            normalize={(value) => value?.toString().toUpperCase()}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Usuario'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Ingresa una contraseña',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Contraseña'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              className='login-form-button'
              loading={isLoading}
              style={{ width: '100%' }}
            >
              Iniciar sesión
            </Button>
          </Form.Item>
          <PasswordRecovery onClick={() => setOpenForgotPassword(true)}>
            Recuperar contraseña
          </PasswordRecovery>
        </Form>
      </LoginCard>
      <CustomModal
        destroyOnClose
        centered
        footer={false}
        visible={openForgotPassword}
        onCancel={() => setOpenForgotPassword(false)}
        width={50}
      >
        <ModalTitle>
          Ingresa tus datos para restaurar la contraseña e ingresar al sistema.
        </ModalTitle>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={handleOnForgotPassword}
        >
          <Form.Item
            name='UserName'
            rules={[
              {
                required: true,
                message: 'Ingresa un usuario',
              },
            ]}
            normalize={(value) => value?.toString().toUpperCase()}
          >
            <Input prefix={<UserOutlined />} placeholder='Usuario' />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              loading={isLoading}
              style={{ width: '100%' }}
            >
              Continuar
            </Button>
          </Form.Item>
        </Form>
      </CustomModal>
      <CustomModal
        destroyOnClose
        centered
        visible={emailModal}
        onCancel={() => setEmailModal(false)}
        onOk={() => setEmailModal(false)}
      >
        <ModalTitle>Revisa tu casilla de correos</ModalTitle>
        <ModalText>
          Se ha enviado un correo electrónico a la dirección que proporcionaste
          con instrucciones para restablecer tu contraseña.
        </ModalText>
      </CustomModal>
    </>
  );
};

const LoginCard = styled.div`
  background-color: #fff;
  border-radius: ${theme.radius};
  box-shadow: 0 8px 24px rgba(22, 28, 45, 0.5);
  width: 35em;
  padding: 2em;

  @media (max-width: 560px) {
    width: 23em;
  }

  @media (max-height: 680px) {
    margin-top: -5em;
  }

  @media (max-height: 590px) {
    margin-top: -5em;
  }
`;

const ModalTitle = styled.h2`
  text-align: center;
  margin: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4em;

  img {
    :hover {
      width: 11em;
      transition: 0.5s ease;
    }

    :not(:hover) {
      width: 10em;
      transition: 0.5s ease;
    }
  }

  @media (max-height: 590px) {
    display: none;
  }
`;

const PasswordRecovery = styled.div`
  display: inline-block;
  cursor: pointer;
  transition: 0.5s ease;
  text-align: center;

  :hover {
    color: lightblue;
  }
`;

const ModalText = styled.p`
  font-size: 16px;
  text-align: center;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;

export default LoginForm;
