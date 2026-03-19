import * as postService from "./post.service.js";

export const specificPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const posts = await postService.displayPost(postId);

    // If it return an empty array when SELECT with the post_id, throw error:
    if (!posts) {
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    res.render('post.ejs', { posts });

  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res) => {
  try {
    const { post_title, post_content, user_id } = req.body;
    const createPost = await postService.createPost(post_title, post_content, user_id);

    res.render('post.ejs', { createPost });

  } catch (err) {
    next(err);
  }
};