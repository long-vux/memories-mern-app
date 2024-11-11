import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPostDetails, addImage } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.get('/:id', getPostDetails);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id/addImage', addImage);

export default router;