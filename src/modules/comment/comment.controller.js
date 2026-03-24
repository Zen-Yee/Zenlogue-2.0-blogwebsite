import * as commentService from "./comment.service.js";

export const getCommentsByPost = async (postId) => {

  const query = `
    SELECT * FROM public.comments 
    WHERE post_id = ? ORDER BY created_at ASC
  `;

  const result = await db.query(query, [postId]);

  return result.rows; // array of comments
};

export const createComment = async (req, res) => {
  try {


  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res) => {
  try {


  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res) => {
  try {


  } catch (err) {
    next(err);
  }
};
