const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');


exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    
    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error(`Error fetching blogs: ${error.message}`);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Server Error: ${error.message}` 
      : 'Server Error';
      
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};


exports.getBlogById = async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid blog ID format'
    });
  }
  
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error in getBlogById:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Blog not found - Invalid ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

exports.createOrUpdateDraft = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id, title, content, tags } = req.body;
    
    let processedTags = [];
    
    if (tags) {
      if (Array.isArray(tags)) {
        processedTags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
      } 
      else if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      }
    }
    
    let blog;
    
    if (id) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid blog ID format'
        });
      }
      
      blog = await Blog.findById(id);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
      
      if (blog.user && req.user && blog.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to edit this blog'
        });
      }
      
      blog.title = title;
      blog.content = content;
      blog.tags = processedTags;
      blog.updatedAt = Date.now();
      
      await blog.save();
    } else {
      blog = await Blog.create({
        title,
        content,
        tags: processedTags,
        status: 'draft',
        user: req.user ? req.user.id : null
      });
    }
    
    res.status(id ? 200 : 201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error(`Error saving draft: ${error.message}`);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Server Error: ${error.message}` 
      : 'Server Error';
      
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

exports.publishBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { id, title, content, tags } = req.body;
    
    let processedTags = [];
    
    if (tags) {
      if (Array.isArray(tags)) {
        processedTags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
      } 
      else if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      }
    }
    
    let blog;
    
    // If ID is provided, find and publish existing blog
    if (id) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid blog ID format'
        });
      }
      
      blog = await Blog.findById(id);
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
      
      if (blog.user && req.user && blog.user.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to edit this blog'
        });
      }
      
      blog.title = title;
      blog.content = content;
      blog.tags = processedTags;
      blog.status = 'published';
      blog.updatedAt = Date.now();
      
      await blog.save();
    } else {
      blog = await Blog.create({
        title,
        content,
        tags: processedTags,
        status: 'published',
        user: req.user ? req.user.id : null
      });
    }
    
    res.status(id ? 200 : 201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error(`Error publishing blog: ${error.message}`);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Server Error: ${error.message}` 
      : 'Server Error';
      
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

exports.deleteBlog = async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid blog ID format'
    });
  }
  
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    if (blog.user && req.user && blog.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this blog'
      });
    }
    
    await blog.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
