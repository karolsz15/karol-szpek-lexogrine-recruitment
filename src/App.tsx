import { Global } from '@emotion/react';
import { Header } from './components/Header/Header';
import { PageContent } from './components/PageContent/PageContent';
import { globalStyles } from './styles/globalStyles';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
      <div className="app">
        <Global styles={globalStyles} />
        <Header />
        <PageContent />
        <Toaster position="top-right" />
      </div>  );
}

export default App;