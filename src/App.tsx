import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AuthProvider } from './contexts/AuthContext';

import { Global } from './styles/css/Global';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Global />
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
