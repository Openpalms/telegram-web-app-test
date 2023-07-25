const TelegramApi = require('node-telegram-bot-api');

const token = '6014535737:AAGvhmuhBWrWQ9Z4ttPfOrKPxg7zvFEOsbE';
const apiKey = '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';
const KPapiKey = 'H83S4C1-BGW458B-NEB6X68-Q9GKBNX';
// @ts-ignore
const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Приветствие' },
  { command: '/info', description: 'Список доступных команд' },
  { command: '/rest', description: 'подобрать ресторан' },
  { command: '/film', description: 'подобрать фильм' },
]);
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Создаем Inline Keyboard с одной кнопкой для отправки WebApp
  const keyboard = {
    inline_keyboard: [
      [{ text: 'Открыть WebApp', callback_data: 'open_webapp' }],
    ],
  };

  // Отправляем сообщение с Inline Keyboard
  bot.sendMessage(chatId, 'Нажмите на кнопку, чтобы открыть WebApp.', {
    reply_markup: JSON.stringify(keyboard),
  });
});

// Обработка нажатия на кнопку в Inline Keyboard
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'open_webapp') {
    // Открываем WebApp
    const timepickerButton = {
      text: 'Выбрать время',
      request_contact: false,
      request_location: false,
    };

    const keyboard = {
      keyboard: [[timepickerButton]],
      resize_keyboard: true,
    };

    bot.sendMessage(chatId, 'Выберите время с помощью timepicker:', {
      reply_markup: JSON.stringify(keyboard),
    });
  }
});

// Обработка нажатия на кнопку в WebApp
bot.onText(/Выбрать время/, (msg) => {
  const chatId = msg.chat.id;
  const time = msg.text;

  // Отправляем пользователю выбранное время
  bot.sendMessage(chatId, `Вы выбрали время: ${time}`);
});

// Обработка нажатия на кнопку "Назад" в WebApp
bot.onText(/Назад/, (msg) => {
  const chatId = msg.chat.id;

  // Закрываем WebApp
  bot.sendMessage(chatId, 'WebApp закрыт.');
});

// Обработка остальных текстовых сообщений
bot.onText(/.*/, (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  // Отправляем подсказку о командах бота
  bot.sendMessage(chatId, 'Используйте команду /start для начала работы.');
});
