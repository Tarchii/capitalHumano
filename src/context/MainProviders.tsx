import React from 'react';
import ApplicationContext, { AppData } from './ApplicationContext';

const MainProviders: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [data, setData] = React.useState({} as AppData);

  console.log(process.env);

  React.useEffect(() => {
    const storedSession = sessionStorage.getItem('session');

    if (!storedSession) return;

    setData(JSON.parse(storedSession));
  }, []);

  return (
    <ApplicationContext.Provider value={[data, setData]}>
      {children}
    </ApplicationContext.Provider>
  )
}

export default MainProviders;