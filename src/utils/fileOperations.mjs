import fs from "fs/promises";

export const pathToPostsFile = process.cwd() + "/src/json/posts.json";

export async function doesFileExist(path) {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
}

export async function writeJsonFile(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function readJsonFile(path) {
  try {
    const data = await fs.readFile(path);
    return JSON.parse(data);
  } catch (error) {
    if (error.code == "ENOENT") {
      return [];
    }

    throw new Error(error.message);
  }
}

export async function addNewPost(filePath, newPost) {
  try {
    const posts = await readJsonFile(filePath);
    const postAlreadyExists = posts.some(post => post.id === newPost.id);

    if (!postAlreadyExists) {
      posts.push(newPost);
      await writeJsonFile(filePath, posts);
      console.log("Post added to logs");
    } else {
      console.log("Post already exists");
    }
  } catch (error) {
    throw new Error(`Failed to add new post: ${error.message}`);
  }
}
