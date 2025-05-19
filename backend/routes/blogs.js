const express = require('express');
const { check } = require('express-validator');
const { 
  getAllBlogs, 
  getBlogById, 
  createOrUpdateDraft, 
  publishBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllBlogs);

router.get('/:id', getBlogById);

router.post(
  '/draft',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
  ],
  protect,
  createOrUpdateDraft
);

router.post(
  '/publish',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
  ],
  protect,
  publishBlog
);

router.delete('/:id', protect, deleteBlog);

module.exports = router;
