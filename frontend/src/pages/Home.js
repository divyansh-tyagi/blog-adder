import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import AuthContext from '../context/AuthContext';
import BlogService from '../utils/blogService';
import { toast } from 'react-toastify';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await BlogService.getAllBlogs();
      setBlogs(response.data);
      setFilteredBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch all blogs on component mount
    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleDeleteBlog = (blogId) => {
    // Filter out the deleted blog from both arrays
    const updatedBlogs = blogs.filter(blog => blog._id !== blogId);
    setBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      // If search is empty, show all blogs
      setFilteredBlogs(blogs);
      setSearching(false);
      return;
    }

    setSearching(true);
    const term = searchTerm.toLowerCase();
    
    // Filter blogs by title, content, or tags
    const results = blogs.filter(blog => 
      blog.title.toLowerCase().includes(term) || 
      blog.content.toLowerCase().includes(term) || 
      (Array.isArray(blog.tags) && blog.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    
    setFilteredBlogs(results);
  };

  // Filter blogs by status
  const publishedBlogs = filteredBlogs.filter(blog => blog.status === 'published');
  const draftBlogs = filteredBlogs.filter(blog => blog.status === 'draft');

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="scale-in">
      <div className="mb-4 text-center">
        <h1 style={{ fontWeight: '800', marginBottom: '1rem', color: 'var(--text-color)', fontSize: '2.75rem' }}>BlogSpace</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--dark-gray)', marginBottom: '2rem' }}>Read, write, and share your thoughts with the world</p>
        
        {isAuthenticated && (
          <Link to="/editor" className="btn btn-primary btn-with-icon" style={{ padding: '0.85rem 1.75rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Blog
          </Link>
        )}
      </div>

      <SearchBar onSearch={handleSearch} />

      {searching && filteredBlogs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No results found</h3>
          <p className="empty-state-description">We couldn't find any blogs matching your search criteria. Try different keywords.</p>
          <button onClick={() => handleSearch('')} className="btn btn-primary">
            Clear Search
          </button>
        </div>
      ) : (
        <>
          <h2 style={{ fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-color)', borderBottom: '2px solid var(--medium-gray)', paddingBottom: '0.75rem' }}>
            {searching ? 'Search Results' : 'Published Blogs'}
          </h2>
          
          {publishedBlogs.length > 0 ? (
            <div className="blog-list mb-4">
              {publishedBlogs.map(blog => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  onDelete={handleDeleteBlog}
                />
              ))}
            </div>
          ) : !searching ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3 className="empty-state-title">No published blogs yet</h3>
              <p className="empty-state-description">Be the first to publish a blog and share your thoughts!</p>
              {isAuthenticated && (
                <Link to="/editor" className="btn btn-primary">
                  Write Your First Blog
                </Link>
              )}
            </div>
          ) : null}

          {isAuthenticated && draftBlogs.length > 0 && (
            <>
              <h2 style={{ fontWeight: '700', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-color)', borderBottom: '2px solid var(--medium-gray)', paddingBottom: '0.75rem' }}>
                Your Drafts
              </h2>
              <div className="blog-list">
                {draftBlogs.map(blog => (
                  <BlogCard 
                    key={blog._id} 
                    blog={blog} 
                    onDelete={handleDeleteBlog}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
