import express from 'express';
import { getPosts, getPost, createPost,} from '../controllers/post.js'


const router = express.Router()


router.get('/',getPosts)
router.post('/', createPost);
router.get('/:id', getPost);
export default router