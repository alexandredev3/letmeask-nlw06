import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';
import { AuthProvider } from './contexts/AuthContext';

import { Global } from './styles/css/Global';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Global />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
