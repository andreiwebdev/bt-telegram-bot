import { fetchLatestPost } from "./services/wordpress.mjs";
import { sendPostToTelegram } from "./services/telegram.mjs";
import { addNewPost, pathToPostsFile } from "./utils/fileOperations.mjs";

async function main() {
  try {
    const latestPost = await fetchLatestPost();
    if (latestPost) {
      const sendTime = new Date();
      await sendPostToTelegram(latestPost);
      console.log(
        `Post successfully sent to Telegram at ${sendTime.toISOString()}`
      );
      await addNewPost(pathToPostsFile, latestPost);
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
