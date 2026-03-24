import db from "../../config/pool.js";

export const displayAllPost = async () => {

  const query = `
    SELECT * FROM public.posts;
  `;

  const result = await db.query(query);

  return result.rows;

};
