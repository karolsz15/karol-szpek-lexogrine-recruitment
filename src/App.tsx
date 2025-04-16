import { Global } from '@emotion/react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header/Header';
import { PageContent } from './components/PageContent/PageContent';
import { globalStyles } from './styles/globalStyles';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

const AppContent = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="app">
      <Global styles={globalStyles} />
      {!isLoggedIn && <Header />}
      <PageContent />
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;