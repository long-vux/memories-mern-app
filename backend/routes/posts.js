import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPostDetails, addImage } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', createPost);
router.get('/:id', getPostDetails);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
router.patch('/:id/addImage', addImage);

export default router;