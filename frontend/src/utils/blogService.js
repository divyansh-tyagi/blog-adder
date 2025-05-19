import axiosInstance from './axiosConfig';

// Blog API service
const BlogService = {
  // Get all blogs
  getAllBlogs: async () => {
    try {
      const response = await axiosInstance.get('/blogs');
      return response.data;
    } catch (error) {
      console.error('Error fetching all blogs:', error.response || error);
      throw error;
    }
  },

  // Get a blog by ID
  getBlogById: async (id) => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog by ID:', error.response || error);
      throw error;
    }
  },

  // Save or update a draft
  saveDraft: async (blogData) => {
    try {
      const response = await axiosInstance.post('/blogs/draft', blogData);
      return response.data;
    } catch (error) {
      console.error('Error saving draft:', error.response || error);
      throw error;
    }
  },

  // Publish a blog
  publishBlog: async (blogData) => {
    try {
      const response = await axiosInstance.post('/blogs/publish', blogData);
      return response.data;
    } catch (error) {
      console.error('Error publishing blog:', error.response || error);
      throw error;
    }
  },

  // Delete a blog
  deleteBlog: async (id) => {
    try {
      const response = await axiosInstance.delete(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting blog:', error.response || error);
      throw error;
    }
  }
};

export default BlogService;
