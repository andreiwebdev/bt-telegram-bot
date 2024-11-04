import dotenv from "dotenv";
import assert from "node:assert";

dotenv.config();

assert(process.env.TELEGRAM_TOKEN, "TELEGRAM_TOKEN is required");
assert(process.env.TELEGRAM_CHANNEL_ID, "TELEGRAM_CHANNEL_ID is required");
assert(process.env.WP_USERNAME, "WP_USERNAME is required");
assert(process.env.WP_APP_PWD, "WP_APP_PWD is required");
assert(process.env.WP_DOMAIN, "WP_DOMAIN is required");

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
