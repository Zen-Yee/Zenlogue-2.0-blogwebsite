import express from 'express';
import db from '../db/pool.js';

const router = express.Router();

// When user click on "Read More" in the Main Page of one specific post
router.get('/:id', async (req, res) => {
  
  // Read id from the request parameter and define as postId
  const postId = req.params.id;

  try {
    const query = `
      SELECT * FROM public.posts
      WHERE post_id = $1
    `;
    const result = await db.query(query, [postId]);
    // result will return an array with only one item.

    // If it return an empty array when SELECT with the post_id, throw error:
    if (result.rows.length === 0) {
      // Post not found → return 404 page or redirect
      return res.status(404).render('404', { message: 'Post not found' });
    }
    
    // There is only one item in result array so take item [0].
    const post = result.rows[0];
    res.render('post.ejs', { post });

  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).render('error', { message: 'Database error' });
  }
});

// When user click on create new post:
router.post('/new', (req, res) => {
  // create new post
  res.redirect('/new-post.ejs');
});

// When user click submit in new-post.ejs:
router.post('/new/submit', async(req, res) => {

  // Read information from request body
  const {post_title, post_content, user_id} = req.body;

  const query = `
    INSERT INTO post (post_title, post_content, user_id)
      VALUES ($1,$2,$3);
  `;

    try {
      await db.query(query, [post_title, post_content, user_id]);
      res.redirect('/');
    } catch (err) {
      console.error("Database insert error:", err);
      res.status(500).render('error', { message: 'Database error' });
  }
});

export default router;
