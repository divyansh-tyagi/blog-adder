import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogService from '../utils/blogService';
import AuthContext from '../context/AuthContext';
import { debounce } from '../utils/helpers';
import Spinner from '../components/Spinner';

// Helper function to safely parse tags
const parseTagsFromString = (tagsString) => {
  if (!tagsString) return [];
  // Split by comma, trim whitespace, and filter out empty tags
  return tagsString.split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
};

// Helper function to format tags for display
const formatTagsForDisplay = (tagsArray) => {
  if (!tagsArray || !Array.isArray(tagsArray) || tagsArray.length === 0) return '';
  return tagsArray.join(', ');
};

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  
  // State for the blog
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    tags: '',
    status: 'draft'
  });
  
  // UI states
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  
  // Destructure blog values
  const { title, content, tags } = blog;
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Fetch blog if editing existing one
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const res = await BlogService.getBlogById(id);
          
          // Check the exact structure of the response
          console.log('Blog response data structure:', res);
          
          // Determine the correct data structure based on the response
          let blogData;
          if (res.data && res.data.data) {
            // If nested data structure
            blogData = res.data.data;
          } else if (res.data) {
            // If direct data object
            blogData = res.data;
          } else if (res.success && res.data) {
            // If success property at root level
            blogData = res.data;
          } else {
            // Fallback
            console.error('Unexpected response format:', res);
            blogData = res;
          }
          
          console.log('Extracted blog data:', blogData);
          
          // Format tags from array to comma-separated string using our helper
          setBlog({
            ...blogData,
            tags: formatTagsForDisplay(blogData.tags || [])
          });
          
          setLoading(false);
        } catch (error) {
          console.error('Error fetching blog:', error);
          console.error('Error response:', error.response);
          
          // Provide detailed error message based on the error
          let errorMessage = 'Failed to load blog';
          
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 404) {
              errorMessage = 'Blog not found. It may have been deleted.';
            } else if (error.response.status === 401) {
              errorMessage = 'You need to be logged in to view this blog';
              // Redirect to login
              setTimeout(() => navigate('/login'), 2000);
            } else if (error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'Network error. Please check your connection.';
          }
          
          toast.error(errorMessage);
          
          // Only navigate away for certain errors
          if (error.response && error.response.status !== 401) {
            navigate('/');
          }
        }
      };
      
      fetchBlog();
    }
  }, [id, navigate]);
  
  const autoSaveBlog = useCallback(
    debounce(async (blogData) => {
      if (!blogData.title && !blogData.content) return;
      
      try {
        setAutoSaveStatus('Saving...');
        console.log('Auto-saving blog data:', blogData);
        
        const processedData = {
          ...blogData,
          tags: parseTagsFromString(blogData.tags) 
        };
        
        const res = await BlogService.saveDraft({
          id: id || null,
          ...processedData
        });
        console.log('Auto-save response:', res);
        
        if (!id) {
          const blogId = res.data?._id || res.data?.data?._id || res._id;
          if (blogId) {
            navigate(`/editor/${blogId}`, { replace: true });
          } else {
            console.error('Could not determine blog ID from response:', res);
          }
        }
        
        setAutoSaveStatus('Draft saved');
        
        setTimeout(() => {
          setAutoSaveStatus('');
        }, 2000);
      } catch (error) {
        console.error('Auto-save error:', error);
        
        // Provide more specific error message based on error type
        let errorMessage = 'Auto-save failed';
        
        if (error.response) {
          // Server responded with an error status
          if (error.response.status === 401) {
            errorMessage = 'Session expired. Please login again';
            // Redirect to login after a short delay
            setTimeout(() => navigate('/login'), 3000);
          } else if (error.response.status === 400) {
            errorMessage = 'Validation error. Check your content';
          } else if (error.response.status >= 500) {
            errorMessage = 'Server error. Try again later';
          }
        } else if (error.request) {
          // Request made but no response received
          errorMessage = 'Network error. Check your connection';
        }
        
        setAutoSaveStatus(errorMessage);
        
        // Clear the status message after 3 seconds
        setTimeout(() => {
          setAutoSaveStatus('');
        }, 3000);
      }
    }, 5000),
    [id, navigate]
  );
  
  // Handle form input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    
    setBlog({
      ...blog,
      [name]: value
    });
    
    // Trigger auto-save when user makes changes
    autoSaveBlog({
      ...blog,
      [name]: value
    });
  };      // Handle manual save as draft
  const saveDraft = async () => {
    if (!title && !content) {
      toast.error('Please add a title or content');
      return;
    }
    
    setSaving(true);
    
    try {
      console.log('Saving draft with data:', {
        id: id || null,
        title,
        content,
        tags: parseTagsFromString(tags)
      });
      
      const res = await BlogService.saveDraft({
        id: id || null,
        title,
        content,
        tags: parseTagsFromString(tags) // Use our helper to parse tags properly
      });
      
      console.log('Save draft response:', res);
      
      toast.success('Draft saved successfully');
      
      // If this is a new blog, redirect to the edit page
      if (!id) {
        // Extract ID from response based on structure
        const blogId = res.data?._id || res.data?.data?._id || res._id;
        if (blogId) {
          navigate(`/editor/${blogId}`);
        } else {
          console.error('Could not determine blog ID from response:', res);
          toast.error('Blog saved but redirect failed');
        }
      }
      
      setSaving(false);
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
      setSaving(false);
    }
  };
  
  // Handle publish
  const publishBlog = async () => {
    if (!title) {
      toast.error('Title is required');
      return;
    }
    
    if (!content) {
      toast.error('Content is required');
      return;
    }
    
    setPublishing(true);
    
    try {
      await BlogService.publishBlog({
        id: id || null,
        title,
        content,
        tags: parseTagsFromString(tags) // Use our helper to parse tags properly
      });
      
      toast.success('Blog published successfully');
      navigate('/');
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast.error('Failed to publish blog');
      setPublishing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    );
  }
  
  return (
    <div className="blog-editor editor-container">
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Enter title..."
        className="blog-title-input"
      />
      
      <textarea
        name="content"
        value={content}
        onChange={onChange}
        placeholder="Write your blog content here..."
        className="blog-content-textarea"
      ></textarea>
      
      <input
        type="text"
        name="tags"
        value={tags}
        onChange={onChange}
        placeholder="Add tags (comma separated)"
        className="form-control blog-tags-input"
      />
      
      <div className="tag-container">
        {parseTagsFromString(tags).map((tag, index) => (
          <span key={index} className="tag-item">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="blog-actions">
        <div className="save-actions">
          <button
            onClick={saveDraft}
            className="btn btn-secondary btn-with-icon"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                Saving...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save as Draft
              </>
            )}
          </button>
          {autoSaveStatus && (
            <span className="ml-2 save-indicator">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#38a169' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="saved-status">{autoSaveStatus}</span>
            </span>
          )}
        </div>
        <button
          onClick={publishBlog}
          className="btn btn-primary btn-with-icon"
          disabled={publishing}
        >
          {publishing ? (
            <>
              <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
              Publishing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              Publish
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
