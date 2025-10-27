import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FormBuilderPage from './pages/FormBuilderPage';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#025551',
            colorLink: '#025551',
            borderRadius: 4,
            fontSize: 14,
          },
        }}
      >
        <Router>
          <div className="App">
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected routes */}
              <Route
                path="/form-builder"
                element={
                  <ProtectedRoute>
                    <FormBuilderPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all - redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;