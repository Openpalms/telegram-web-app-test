const telegram = window.Telegram.WebApp;

export const useTelegram = () => {
  const hideBtn = () => {
    telegram.MainButton.hide();
  };
  const showBtn = () => {
    telegram.MainButton.show();
  };

  return { telegram, hideBtn, showBtn };
};
