import React from 'react';
import './custom.css';
import MainProviders from './context/MainProviders';
import Layout from './components/layout';

const App: React.FC = () => (
  <MainProviders>
    <Layout />
  </MainProviders>
);

export default App;
