import './App.css';
import { AppRouter } from '@/app/router/AppRouter.tsx';
import { AppProviders } from '@/app/providers/AppProviders.tsx';

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
