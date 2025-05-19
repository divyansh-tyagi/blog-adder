import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  const { username, email, password, confirmPassword } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const result = await register({
      username,
      email,
      password
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      toast.success('Registration successful');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };
  
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <div className="auth-form scale-in">
          <h2 className="auth-title">Create Account</h2>
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={username}
                onChange={onChange}
                required
                placeholder="Choose a username"
              />
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={onChange}
                required
                placeholder="Your email address"
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={onChange}
                minLength="6"
                required
                placeholder="Create a password"
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={onChange}
                minLength="6"
                required
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>
            
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              {isSubmitting ? (
                <span className="btn-with-icon">
                  <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </form>
          
          <p className="auth-redirect">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Register;
