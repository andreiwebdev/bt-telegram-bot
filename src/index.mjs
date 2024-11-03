import { fetchLatestPost } from "./services/wordpress.mjs";
import { sendPostToTelegram } from "./services/telegram.mjs";

async function main() {
  try {
    const latestPost = await fetchLatestPost();
    if (latestPost) {
      await sendPostToTelegram(latestPost);
      console.log("Post successfully sent to Telegram!");
    }
  } catch (error) {
    console.error("Error in main process:", error);
  }
}

main();

const POLLING_INTERVAL = 1000 * 60 * 5;
setInterval(main, POLLING_INTERVAL); // Run every 5 minutes

process.on("SIGINT", () => {
  console.log("Bot shutting down..");
  process.exit(0);
});
