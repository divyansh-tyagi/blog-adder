import axiosInstance from './axiosConfig';

const BlogService = {
  getAllBlogs: async () => {
    try {
      const response = await axiosInstance.get('/blogs');
      return response.data;
    } catch (error) {
      console.error('Error fetching all blogs:', error.response || error);
      throw error;
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog by ID:', error.response || error);
      throw error;
    }
  },

  saveDraft: async (blogData) => {
    try {
      const response = await axiosInstance.post('/blogs/draft', blogData);
      return response.data;
    } catch (error) {
      console.error('Error saving draft:', error.response || error);
      throw error;
    }
  },

  publishBlog: async (blogData) => {
    try {
      const response = await axiosInstance.post('/blogs/publish', blogData);
      return response.data;
    } catch (error) {
      console.error('Error publishing blog:', error.response || error);
      throw error;
    }
  },

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
