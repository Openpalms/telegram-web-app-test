import { useEffect } from 'react';
import './App.css';
import { TimePicker } from './Components/TimePicker/TimePicker';

declare global {
  interface Window {
    Telegram: any;
  }
}

const telegram = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    telegram.ready();
  }, []);
  const onClose = () => {
    telegram.close();
  };
  return (
    <div className="App">
      <TimePicker onClose={onClose} />
    </div>
  );
}

export default App;
