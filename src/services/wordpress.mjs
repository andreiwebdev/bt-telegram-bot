import axios from "axios";
import { config } from "../config/config.mjs";

export async function fetchLatestPost() {
  try {
    const response = await axios.get(
      `${config.wordpress.domain}/wp-json/wp/v2/posts?per_page=1&_embed`,
      {
        headers: {
          Authorization: `Basic ${config.wordpress.auth}`,
        },
      }
    );

    return {
      id: response.data[0].id,
      date: response.data[0].date,
      link: response.data[0].link,
      title: response.data[0].title.rendered,
      excerpt: response.data[0].excerpt.rendered,
      imageURL:
        response.data[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        null,
    };
  } catch (err) {
    console.error("WordPress API Error:", err);
    throw new Error(err.message);
  }
}
