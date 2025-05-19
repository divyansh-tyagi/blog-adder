import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import BlogService from '../utils/blogService';

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  
  // Function to truncate content
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Handle blog deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await BlogService.deleteBlog(blog._id);
        toast.success('Blog deleted successfully');
        // If onDelete prop exists, call it to refresh the parent component
        if (onDelete) {
          onDelete(blog._id);
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog');
      }
    }
  };

  return (
    <div className="blog-card">
      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link to={`/editor/${blog._id}`}>{blog.title || 'Untitled Blog'}</Link>
        </h3>
        
        <div className="blog-card-meta">
          <span>
            {blog.status === 'published' ? (
              <span className="published-badge">Published</span>
            ) : (
              <span className="draft-badge">Draft</span>
            )}
          </span>
          <span>Updated: {formatDate(blog.updatedAt)}</span>
        </div>
        
        <p className="blog-card-excerpt">
          {truncateContent(blog.content || 'No content yet')}
        </p>
        
        <p>
          {truncateContent(blog.content)}
          {blog.content.length > 150 && (
            <Link to={`/editor/${blog._id}`}> Read more</Link>
          )}
        </p>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-card-tags">
            {blog.tags.map((tag, index) => (
              <span key={index} className="blog-card-tag">{tag}</span>
            ))}
          </div>
        )}
        
        {isAuthenticated && (
          <div className="blog-card-actions">
            <Link to={`/editor/${blog._id}`} className="btn btn-sm btn-primary">
              Edit
            </Link>
            <button 
              onClick={handleDelete} 
              className="btn btn-sm btn-danger"
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
