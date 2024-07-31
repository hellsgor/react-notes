import './App.css';
import { Account } from './components/Account/Account';
import { useMeQuery } from './hooks/useMeQuery';

function App() {
  const meQuery = useMeQuery();

  return (
    <div className="app">
      <Account meQuery={meQuery} />
    </div>
  );
}

export default App;
