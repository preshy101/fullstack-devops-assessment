// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { loginStart, loginSuccess, loginFailure, clearError } from '../redux/slices/authSlice';
import './LoginPage.scss';

const { Title, Text } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/form-builder');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Show error message if login fails
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogin = async (values) => {
    dispatch(loginStart());

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      setTimeout(() => {
        // Mock successful login
        const mockUser = {
          id: '1',
          name: values.email.split('@')[0],
          email: values.email,
        };
        const mockToken = 'mock-jwt-token-' + Date.now();

        dispatch(loginSuccess({
          user: mockUser,
          token: mockToken,
        }));

        message.success('Login successful!');
        navigate('/form-builder');
      }, 1000);

      // Actual API call would look like:
      /*
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: values.email,
        password: values.password,
      });
      
      dispatch(loginSuccess({
        user: response.data.user,
        token: response.data.token,
      }));
      
      message.success('Login successful!');
      navigate('/form-builder');
      */
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed. Please try again.'));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="logo-section">
            <div className="logo-icon">
              <UserOutlined />
            </div>
            <Title level={2}>Welcome Back</Title>
            <Text type="secondary">Sign in to continue to Form Builder</Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            layout="vertical"
            size="large"
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email Address"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item>
              <div className="form-footer">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                className="login-button"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form.Item>

            <div className="register-link">
              <Text>Don't have an account? </Text>
              <Link to="/register">Sign Up</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
