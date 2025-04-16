import { Global } from '@emotion/react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header/Header';
import { PageContent } from './components/PageContent/PageContent';
import { globalStyles } from './styles/globalStyles';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Global styles={globalStyles} />
        <Header />
        <PageContent />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;