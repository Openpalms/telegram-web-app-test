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
    telegram.MainButton.show();
    telegram.MainButton.setParams({
      text: 'Подтвердить',
    });
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
