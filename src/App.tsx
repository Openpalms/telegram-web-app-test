import { useEffect } from 'react';
import './App.css';
import { TimePicker } from './Components/TimePicker/TimePicker';
import { useTelegram } from './hooks/useTelegram';

declare global {
  interface Window {
    Telegram: any;
  }
}

function App() {
  const { telegram } = useTelegram();
  useEffect(() => {
    telegram.ready();
  }, []);

  return (
    <div className="App">
      <TimePicker />
    </div>
  );
}

export default App;
