import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import CroupierLobby from './CroupierLobby';
import SupervisorLobby from './SupervisorLobby';

const Lobby = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      {user.role === 'supervisor' && <SupervisorLobby user={user} />}
      {user.role === 'croupier' && <CroupierLobby user={user} />}
    </>
  );
};

export default Lobby;
