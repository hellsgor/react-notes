import './App.css';
import { Account } from './components/Account/Account';
import { FetchNotesListView } from './components/NotesListView/FetchNotesListView';
import { useMeQuery } from './hooks/useMeQuery';

function App() {
  const meQuery = useMeQuery();

  return (
    <div className="app">
      <Account meQuery={meQuery} />

      {meQuery.status === 'success' && (
        <div className="container">
          <FetchNotesListView />
        </div>
      )}
    </div>
  );
}

export default App;
