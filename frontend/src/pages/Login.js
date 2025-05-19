import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const { email, password } = formData;
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    const result = await login(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      toast.success('Login successful');
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
          <h2 className="auth-title">Welcome Back</h2>
          
          <form onSubmit={onSubmit}>
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
                placeholder="Your password"
              />
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
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Login;
