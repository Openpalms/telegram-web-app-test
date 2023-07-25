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
    telegram.MainButton.show();
    telegram.MainButton.setParams({
      text: 'Подтвердить',
    });
  }, []);
  const onClose = () => {
    telegram.close();
  };
  const onToggle = () => {
    if (telegram.MainButton.isOpened) {
      telegram.MainButton.hide();
    } else {
      telegram.MainButton.show();
    }
  };
  return (
    <div className="App">
      <TimePicker onClose={onClose} />
      <button className="Btn" onClick={onToggle}>
        Закрыть
      </button>
    </div>
  );
}

export default App;
