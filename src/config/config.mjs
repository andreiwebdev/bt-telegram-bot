import dotenv from "dotenv";
dotenv.config();

export const config = {
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    channelId: process.env.TELEGRAM_CHANNEL_ID,
  },
  wordpress: {
    username: process.env.WP_USERNAME,
    password: process.env.WP_APP_PWD,
    domain: process.env.WP_DOMAIN,
    auth: Buffer.from(
      `${process.env.WP_USERNAME}:${process.env.WP_APP_PWD}`
    ).toString("base64"),
  },
};
