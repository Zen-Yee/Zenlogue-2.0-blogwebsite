import * as postService from "./post.service.js";

export const allPost = async (req, res) => {
    try {
         const posts = await postService.displayAllPost();

        // If it return an empty array when SELECT with the post_id, throw error:
        if (!posts ) {
          // If there is no post at all
          return res.status(404).render('404', { message: 'No post found' });
        }
        
        res.render('index.ejs',{posts });
    
      } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).render('error', { message: 'Database error' });
      }
};

export const specificPost = async (req, res) => {
    try {
         const postId = req.params.id;
         const selectedPost = await postService.displayPost(postId);

        // If it return an empty array when SELECT with the post_id, throw error:
        if (!selectedPost) {
          // Post not found → return 404 page or redirect
          return res.status(404).render('404', { message: 'Post not found' });
        }
        
        res.render('post.ejs', { selectedPost });
    
      } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).render('error', { message: 'Database error' });
      }
};

export const createPost = async (req, res) => {
    try{
        const {post_title, post_content, user_id} = req.body;
        const createPost = await postService.createPost(post_title, post_content, user_id);

      res.render('post.ejs', { createPost });
    
    }catch(err){
      console.error("Database insert error:", err);
      res.status(500).render('error', { message: 'Database error' });
    }
};