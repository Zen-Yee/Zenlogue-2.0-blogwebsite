import * as homeService from "./home.service.js";

export const allPost = async (req, res, next) => {
  try {
    const posts = await homeService.displayAllPost();

    // If it return an empty array when SELECT with the post_id, throw error:
    if (posts.length === 0) {
      res.render('index.ejs', {
        posts,
        currentUser: req.session?.user || null,
      });
    }

    res.render('index.ejs', { posts, currentUser: req.session?.user || null });

  } catch (err) {
    next(err);
  }
};
