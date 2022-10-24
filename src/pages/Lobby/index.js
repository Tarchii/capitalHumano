import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';

const Lobby = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      ESTO ES EL LOBBY
    </>
  );
};

export default Lobby;
