import TelegramBot from "node-telegram-bot-api";
import { config } from "../config/config.mjs";
import { formatTelegramMessage } from "../utils/textFormatter.mjs";

const bot = new TelegramBot(config.telegram.token, { polling: true });

export async function sendPostToTelegram(post) {
  try {
    // Send image first if available
    if (post.imageURL) {
      await bot.sendPhoto(config.telegram.channelId, post.imageURL);
    }

    // Send formatted message
    const message = formatTelegramMessage(post.title, post.excerpt, post.link);
    await bot.sendMessage(config.telegram.channelId, message, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  } catch (err) {
    console.error("Telegram API Error:", err);
    throw new Error(err.message);
  }
}
