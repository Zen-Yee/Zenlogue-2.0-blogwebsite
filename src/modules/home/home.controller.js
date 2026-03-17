import * as homeService from "./home.service.js";

export const allPost = async (req, res) => {
    try {
         const posts = await homeService.displayAllPost();

        // If it return an empty array when SELECT with the post_id, throw error:
        if (!posts ) {
          // If there is no post at all
          return res.status(404).render('404', { message: 'No post found' });
        }
        
        res.render('index.ejs',{posts, currentUser: req.session?.user || null });
    
      } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).render('error', { message: 'Database error' });
      }
};
