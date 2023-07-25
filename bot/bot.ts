const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '6014535737:AAGvhmuhBWrWQ9Z4ttPfOrKPxg7zvFEOsbE';
const webAppUrl = 'https://master--bucolic-bienenstitch-18b937.netlify.app/';

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    await bot.sendMessage(
      chatId,
      'Приступим! Для открытия timepicker нажмите кнопку ниже.',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Открыть!', web_app: { url: webAppUrl } }],
          ],
        },
      }
    );
  }
});
const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT));
