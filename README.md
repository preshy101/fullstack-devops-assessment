# Dynamic Form Builder Application

A powerful React-based form builder application with drag-and-drop functionality, authentication, and comprehensive form management features.

![Form Builder](https://img.shields.io/badge/React-18.2.0-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.12-red)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Usage Guide](#usage-guide)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

### Authentication System
- ✅ User registration with validation
- ✅ User login with JWT token support
- ✅ Protected routes for authenticated users
- ✅ User profile menu with logout
- ✅ Token persistence in localStorage

### Form Builder
- ✅ **Drag & Drop Interface** - Intuitive field placement
- ✅ **Sections & Groups** - Organize forms hierarchically
- ✅ **Multiple Field Types** - Text, radio, checkbox, file upload, dropdown, date picker
- ✅ **Field Configuration** - Required fields, full-width layout, labels, placeholders
- ✅ **Undo/Redo** - Full history management
- ✅ **Real-time Preview** - See form as you build

### Field Types Supported

**Standard Fields:**
- Photo Upload
- Text Inputs (Name, Email, Mobile)
- Date Picker
- Radio Buttons
- Checkboxes
- Dropdowns

**Custom Fields:** (25+ types)
- Amount Input
- Date/Time Picker
- Signature Input
- Geolocation Picker
- File Upload
- And many more...

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for cloning the repository)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

Check your versions:
```bash
node --version
npm --version
git --version
```

## 📥 Installation

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd dynamic-form-builder
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

This will install all required dependencies including:
- React 18.2.0
- Redux Toolkit
- React Router DOM
- Ant Design
- @dnd-kit (Drag and Drop)
- SASS
- Axios
- And more...

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development

# Optional: Add other environment variables as needed
```

### Step 4: Verify Installation

Check that all dependencies are installed:

```bash
npm list --depth=0
```

You should see all packages listed without errors.

## 📁 Project Structure

```
dynamic-form-builder/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── api/                          # API configuration
│   │   ├── axiosConfig.js
│   │   ├── authApi.js
│   │   └── formApi.js
│   │
│   ├── components/
│   │   ├── common/                   # Reusable components
│   │   │   ├── ProtectedRoute/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── Button/
│   │   │   ├── Loading/
│   │   │   └── ErrorMessage/
│   │   │
│   │   └── formBuilder/              # Form builder components
│   │       ├── FormBuilderHeader/
│   │       │   ├── FormBuilderHeader.jsx
│   │       │   └── FormBuilderHeader.scss
│   │       ├── FormBuilderNav/
│   │       │   ├── FormBuilderNav.jsx
│   │       │   └── FormBuilderNav.scss
│   │       ├── LeftSidebar/
│   │       │   ├── LeftSidebar.jsx
│   │       │   └── LeftSidebar.scss
│   │       ├── Canvas/
│   │       │   ├── Canvas.jsx
│   │       │   └── Canvas.scss
│   │       ├── Section/
│   │       │   ├── Section.jsx
│   │       │   └── Section.scss
│   │       ├── Group/
│   │       │   ├── Group.jsx
│   │       │   └── Group.scss
│   │       ├── Field/
│   │       │   ├── Field.jsx
│   │       │   └── Field.scss
│   │       └── RightSidebar/
│   │           ├── RightSidebar.jsx
│   │           └── RightSidebar.scss
│   │
│   ├── pages/                        # Page components
│   │   ├── LoginPage.jsx
│   │   ├── LoginPage.scss
│   │   ├── RegisterPage.jsx
│   │   ├── RegisterPage.scss
│   │   ├── FormBuilderPage.jsx
│   │   └── FormBuilderPage.scss
│   │
│   ├── redux/                        # State management
│   │   ├── slices/
│   │   │   ├── authSlice.js         # Authentication state
│   │   │   └── formSlice.js         # Form builder state
│   │   └── store.js                 # Redux store configuration
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useFormBuilder.js
│   │   └── useDragAndDrop.js
│   │
│   ├── utils/                        # Utility functions
│   │   ├── constants.js
│   │   ├── validation.js
│   │   └── helpers.js
│   │
│   ├── styles/                       # Global styles
│   │   ├── _variables.scss          # SASS variables
│   │   ├── _mixins.scss             # SASS mixins
│   │   ├── _reset.scss              # CSS reset
│   │   └── global.scss              # Global styles
│   │
│   ├── App.jsx                       # Main App component
│   ├── App.scss                      # App styles
│   └── index.js                      # Entry point
│
├── .env                              # Environment variables
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies
├── README.md                         # This file
└── package-lock.json                 # Dependency lock file
```

## 🚀 Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

The application will open at: **http://localhost:3000**

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build files will be in the `build/` directory.

### Running Tests

Run the test suite:

```bash
npm test
```

## 📖 Usage Guide

### 1. First Time Setup

#### Register a New Account

1. Visit `http://localhost:3000`
2. You'll be redirected to `/login`
3. Click **"Sign Up"** link
4. Fill in the registration form:
   - **Name:** Your full name
   - **Email:** Valid email address
   - **Password:** At least 8 characters
   - **Confirm Password:** Must match password
5. Click **"Sign Up"** button
6. On success, you'll be redirected to login page

#### Login to Your Account

1. Enter your email and password
2. Click **"Sign In"** button
3. On success, you'll be redirected to the form builder

### 2. Building Your First Form

#### Add a Section

1. Click the **green "+" button** in the left sidebar
2. A new section will appear in the canvas
3. You can add multiple sections

#### Add a Group to Section

1. Click **"Add Group"** button inside a section
2. Edit the group title by clicking the edit icon
3. Toggle **"Required"** if needed
4. You can add multiple groups per section

#### Add Fields to Group

**Method 1: Drag & Drop**
1. Click **"Add Elements"** button in the canvas header
2. Right sidebar opens with available fields
3. Browse **"Standard Fields"** or **"Custom Fields"** tab
4. **Drag a field** from the sidebar
5. **Drop it into a group** (group will highlight green)
6. Field appears instantly with full functionality

**Method 2: Browse Categories**
1. Expand field categories (PRF - Account Profile, BIO - Biodata, etc.)
2. See all available fields in each category
3. Drag any field to your form

#### Configure Fields

Each field has these options:
- **Label** - Click to edit field name
- **Full Width** - Toggle to make field span full width
- **Required** - Toggle to make field mandatory
- **Copy** - Duplicate the field
- **Delete** - Remove the field

#### Save Your Form

1. Click **"Save"** button in the header
2. Form structure is saved (currently in Redux state)
3. For persistence, integrate with backend API

### 3. Form Management Features

#### Undo/Redo

- Click **undo arrow** in left sidebar to undo last action
- Click **redo arrow** to redo an undone action
- Keyboard shortcuts work too (coming soon)

#### Reorder Elements

- Use drag handles (☰) to reorder fields within groups
- Reorder groups within sections
- Reorder sections (coming soon)

#### Delete Elements

- Click **trash icon** on any field to delete it
- Click **delete** in group menu to remove entire group
- Use section menu to delete sections

#### User Profile

- Click your **avatar** in the top-right corner
- View profile options
- Click **"Logout"** to sign out

## ⚙️ Configuration

### Brand Colors

Edit `src/styles/_variables.scss`:

```scss
// Primary brand colors
$primary-color: #025551;      // Main brand color
$primary-light: #EDFFFA;      // Light variant
$primary-hover: #034440;      // Hover state

// Customize as needed
```

### Form Field Types

Add new field types in components:

1. Define field type in `RightSidebar.jsx`:
```javascript
const customFields = [
  { type: 'your_field', label: 'Your Field', icon: <YourIcon /> },
  // ...
];
```

2. Add rendering logic in `Field.jsx`:
```javascript
case 'your_field':
  return <YourFieldComponent />;
```

### API Endpoints

Configure in `.env`:
```env
REACT_APP_API_URL=http://your-api-url.com/api
```

Update endpoints in `src/utils/constants.js`:
```javascript
export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORMS: '/forms',
  // Add more endpoints
};
```

## 🔌 API Integration

### Connect to Laravel Backend

The application is ready to integrate with a Laravel backend API.

#### 1. Update API Configuration

Edit `src/api/axiosConfig.js`:

```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
```

#### 2. Create API Service Files

**Authentication API** (`src/api/authApi.js`):

```javascript
import axiosInstance from './axiosConfig';

export const authApi = {
  login: (credentials) => 
    axiosInstance.post('/login', credentials),
  
  register: (userData) => 
    axiosInstance.post('/register', userData),
  
  logout: () => 
    axiosInstance.post('/logout'),
  
  getUser: () => 
    axiosInstance.get('/user'),
};
```

**Forms API** (`src/api/formApi.js`):

```javascript
import axiosInstance from './axiosConfig';

export const formApi = {
  getForms: () => 
    axiosInstance.get('/forms'),
  
  getForm: (id) => 
    axiosInstance.get(`/forms/${id}`),
  
  createForm: (formData) => 
    axiosInstance.post('/forms', formData),
  
  updateForm: (id, formData) => 
    axiosInstance.put(`/forms/${id}`, formData),
  
  deleteForm: (id) => 
    axiosInstance.delete(`/forms/${id}`),
};
```

#### 3. Update Login Handler

In `LoginPage.jsx`, replace mock authentication:

```javascript
import { authApi } from '../api/authApi';

const handleLogin = async (values) => {
  dispatch(loginStart());
  
  try {
    const response = await authApi.login({
      email: values.email,
      password: values.password,
    });
    
    dispatch(loginSuccess({
      user: response.data.user,
      token: response.data.token,
    }));
    
    message.success('Login successful!');
    navigate('/form-builder');
  } catch (err) {
    dispatch(loginFailure(
      err.response?.data?.message || 'Login failed'
    ));
  }
};
```

#### 4. Laravel API Requirements

Your Laravel API should provide these endpoints:

```
POST   /api/register          - User registration
POST   /api/login             - User login
POST   /api/logout            - User logout
GET    /api/user              - Get authenticated user

GET    /api/forms             - List all forms
POST   /api/forms             - Create new form
GET    /api/forms/{id}        - Get form details
PUT    /api/forms/{id}        - Update form
DELETE /api/forms/{id}        - Delete form
```

**Expected Response Format:**

Login Success:
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

Form Data:
```json
{
  "id": 1,
  "title": "Student Leave Request Form",
  "sections": [
    {
      "id": "section-1",
      "title": "Personal Information",
      "groups": [
        {
          "id": "group-1",
          "title": "Contact Details",
          "fields": [...]
        }
      ]
    }
  ]
}
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue 1: Application Won't Start

**Error:** `npm start` fails or shows errors

**Solutions:**
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

3. Check Node version:
   ```bash
   node --version  # Should be 16+
   ```

#### Issue 2: Drag & Drop Not Working

**Symptoms:** Can't drag fields into groups

**Solutions:**
1. Check browser console (F12) for errors
2. Verify console shows drag events:
   ```
   Drag started: ...
   Dragging over: ...
   Drag ended: ...
   ```
3. Clear browser cache and hard reload (Ctrl+Shift+R)
4. Try a different browser

#### Issue 3: Login/Register Not Working

**Symptoms:** Can't login or register

**Solutions:**
1. Check that you're using mock authentication (no API required yet)
2. Verify form validation (email format, password length)
3. Check browser console for errors
4. Clear localStorage:
   ```javascript
   // In browser console
   localStorage.clear()
   ```

#### Issue 4: Styles Not Loading

**Symptoms:** Application looks broken, no colors

**Solutions:**
1. Verify SASS is installed:
   ```bash
   npm list sass
   ```
2. Check that `.scss` files are in correct locations
3. Restart development server
4. Clear browser cache

#### Issue 5: Redux State Issues

**Symptoms:** State not updating, actions not working

**Solutions:**
1. Install Redux DevTools browser extension
2. Check state in DevTools
3. Verify Redux store is configured in `App.jsx`
4. Check that reducers are properly imported

### Getting Help

If you encounter issues not listed here:

1. **Check the console** - Most errors show in browser console (F12)
2. **Check Redux DevTools** - Verify state changes
3. **Check Network tab** - See API request/response (when integrated)
4. **Search existing issues** - GitHub issues might have solutions
5. **Create an issue** - Provide error messages and steps to reproduce

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Can register new user
- [ ] Registration validation works
- [ ] Can login with credentials
- [ ] Can't access form builder without login
- [ ] Can logout successfully
- [ ] Token persists on page refresh

**Form Builder:**
- [ ] Can add sections
- [ ] Can add groups to sections
- [ ] Can drag fields from sidebar
- [ ] Fields appear in groups on drop
- [ ] Can configure field properties
- [ ] Can delete fields/groups/sections
- [ ] Undo/redo works

**UI/UX:**
- [ ] All buttons are clickable
- [ ] Forms validate correctly
- [ ] Loading states show
- [ ] Error messages display
- [ ] Responsive on mobile
- [ ] No console errors

## 📦 Building for Production

### Create Production Build

```bash
npm run build
```

This creates optimized files in `build/` directory.

### Deployment Options

**Option 1: Static Hosting (Netlify, Vercel)**
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables
5. Deploy

**Option 2: Traditional Server**
1. Build the application
2. Copy `build/` folder to server
3. Configure web server (Apache/Nginx)
4. Serve the static files

**Option 3: Docker**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ES6+ JavaScript
- Follow React best practices
- Use functional components with hooks
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work - [YourGitHub](https://github.com/preshy101)

## 🙏 Acknowledgments

- React Team for the amazing framework
- Ant Design for beautiful UI components
- @dnd-kit for drag-and-drop functionality
- Redux Team for state management

## 📞 Support

For support and questions: 
- **Issues:** [GitHub Issues](https://github.com/preshy101/form-builder/issues)

---

**Built with ❤️ using React, Redux, and Ant Design**

## 🎯 Quick Start Summary

```bash
# Clone repository
git clone <your-repo-url>
cd dynamic-form-builder

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start

# Open browser
http://localhost:3000

# Register → Login → Build Forms! 🚀
```

That's it! You're ready to start building amazing forms! 🎉






# Backend Development
Form Management RESTful API

This API provides user authentication and complete CRUD operations for managing user-defined forms.

Technical Stack

Framework: Laravel 10+

Authentication: JWT (via tymon/jwt-auth)

Database: MySQL/PostgreSQL

API Response Format

All successful responses adhere to the following JSON structure:

{
    "success": true,
    "data": {
        // resource or collection data
    },
    "message": "A descriptive message"
}



Error responses use a 4xx or 5xx HTTP status code and the following structure:

{
    "success": false,
    "message": "Error description",
    "errors": {
        // Optional: detailed validation errors
    }
}



Authentication Endpoints

All authenticated routes require a valid JWT token passed in the Authorization: Bearer <token> header.

Method

Endpoint

Description

Guard

POST

/api/register

User registration

Public

POST

/api/login

User login (returns JWT)

Public

POST

/api/logout

Invalidates the current JWT

Auth

GET

/api/user

Get authenticated user details

Auth

Form Management Endpoints

These endpoints are protected by the auth:api middleware.

Method

Endpoint

Description

Guard

GET

/api/forms

List all forms for the authenticated user

Auth

POST

/api/forms

Create a new form with structure

Auth

GET

/api/forms/{id}

Get specific form details

Auth

PUT

/api/forms/{id}

Update form metadata or structure

Auth

DELETE

/api/forms/{id}

Delete a form

Auth








# DevOps & Deployment
# GitHub Actions workflow: builds frontend & backend, builds images, pushes to registry and deploys via SSH
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  workflow_dispatch:

env:
  FRONTEND_IMAGE: ${{ secrets.REGISTRY }}/${{ secrets.IMAGE_REPO_PREFIX }}/frontend:latest
  BACKEND_IMAGE: ${{ secrets.REGISTRY }}/${{ secrets.IMAGE_REPO_PREFIX }}/backend:latest

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install frontend deps & build
        working-directory: ./frontend
        run: |
          npm ci
          npm run build

      - name: Set up PHP
        uses: shivammathur/setup-php@v3
        with:
          php-version: 8.1
          extensions: mbstring, pdo_mysql, bcmath, zip

      - name: Install backend deps
        working-directory: ./backend
        run: |
          composer install --no-interaction --prefer-dist --optimize-autoloader
          php artisan config:cache || true

  docker_build_and_push:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Log in to registry
        uses: docker/login-action@v2
        with:
          registry: ${{ secrets.REGISTRY }}
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push frontend image
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          file: ./frontend/Dockerfile
          push: true
          tags: ${{ env.FRONTEND_IMAGE }}

      - name: Build and push backend image
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          file: ./backend/Dockerfile
          push: true
          tags: ${{ env.BACKEND_IMAGE }}

  deploy:
    needs: docker_build_and_push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install SSH key
        uses: webfactory/ssh-agent@v0.8.1
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Deploy to server (pull images & restart)
        run: |
          ssh -o StrictHostKeyChecking=no ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} << 'EOF'
            set -e
            export REGISTRY=${{ secrets.REGISTRY }}
            export IMAGE_REPO_PREFIX=${{ secrets.IMAGE_REPO_PREFIX }}

            # Change to the folder where docker-compose.yml is located on the server
            cd ${{ secrets.DEPLOY_PATH:-/home/${{ secrets.DEPLOY_USER }}/app }}
            # Pull latest images
            docker-compose pull || true
            docker-compose down || true
            docker-compose up -d --remove-orphans
            docker system prune -f || true
          EOF
        env:
          DOCKER_REGISTRY: ${{ secrets.REGISTRY }}