import './App.css';
import { Account } from './components/Account/Account';
import { AuthForm } from './components/AuthForm';

function App() {
  return (
    <div className="app">
      <Account />

      <AuthForm />
    </div>
  );
}

export default App;
