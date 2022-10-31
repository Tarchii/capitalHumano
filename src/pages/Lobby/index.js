import styled from 'styled-components';
import AppLayout from '../../components/layout/AppLayout';
import useAuth from '../../hooks/useAuth';

const Lobby = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <Container>¡Bienvenido {user.username}!</Container>
    </AppLayout>

  )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
font-size: 50px;
`;

export default Lobby;