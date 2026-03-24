import db from "../../config/pool.js";

export const displayAllPost = async () => {

  const query = `
    SELECT * FROM public.posts;
  `;

  const result = await db.query(query);

  return result.rows;

};

export const displayPost = async (postId) => {

    const query = `
      SELECT * FROM public.posts
      WHERE post_id = $1
    `;

    const result = await db.query(query, [postId]);

  return result.rows[0];
};

export const getCommentsByPost = async (postId) => {

  const query = `
    SELECT * FROM comments 
    WHERE post_id = ? ORDER BY created_at ASC
  `;

  const result = await db.query(query, [postId]);

  return result.rows; // array of comments
};

export const createPost = async (post_title, post_content, user_id) => {

  const query = `
    INSERT INTO post (post_title, post_content, user_id)
      VALUES ($1,$2,$3)
      RETURNING *;
  `;

    await db.query(query, [post_title, post_content, user_id]);
  return result.rows[0];
};

export const updatedPost = async (postId, post_title, post_content) => {

  const query = `
    UPDATE post 
      SET post_title = $1, post_content = $2)
      WHERE post_id = $3
      RETURNING *;
  `;

    await db.query(query, [post_title, post_content, postId]);
  return result.rows[0];
};

