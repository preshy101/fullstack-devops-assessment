
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { registerStart, registerSuccess, registerFailure, clearError } from '../redux/slices/authSlice';
import './RegisterPage.scss';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  useEffect(() => {
    // Show error message if registration fails
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleRegister = async (values) => {
    dispatch(registerStart());

    try {
      // TODO: Replace with actual API call
      // Simulating API call
      setTimeout(() => {
        // Mock successful registration
        dispatch(registerSuccess());
        message.success('Registration successful! Please login.');
        navigate('/login');
      }, 1000);

      // Actual API call would look like:
      /*
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      
      dispatch(registerSuccess());
      message.success('Registration successful! Please login.');
      navigate('/login');
      */
    } catch (err) {
      dispatch(registerFailure(err.response?.data?.message || 'Registration failed. Please try again.'));
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <Card className="register-card">
          <div className="logo-section">
            <div className="logo-icon">
              <UserOutlined />
            </div>
            <Title level={2}>Create Account</Title>
            <Text type="secondary">Sign up to get started with Form Builder</Text>
          </div>

          <Form
            form={form}
            name="register"
            onFinish={handleRegister}
            layout="vertical"
            size="large"
            className="register-form"
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { min: 2, message: 'Name must be at least 2 characters!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Full Name"
                autoComplete="name"
              />
            </Form.Item>

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
                { min: 8, message: 'Password must be at least 8 characters!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                className="register-button"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </Form.Item>

            <div className="login-link">
              <Text>Already have an account? </Text>
              <Link to="/login">Sign In</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;