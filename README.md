
# Dynamic Form Builder Application
## Live Demo
**URL**: [\[Your deployed application URL\]](https://fullstack-devops-assessment-preshy1.vercel.app/login)
**Test Credentials** (optional):
- Email: 
- Password: 



## Quick Start with Docker
1. Initial Build: Build the images and start the services in detached mode.
    docker compose up --build -d

2. Access: The application will be accessible at http://localhost.
    Execute the artisan command inside the running 'backend' container
    docker compose exec backend php artisan migrate

## API Documentation
Authentication Endpoints

All authenticated routes require a valid JWT token passed in the Authorization: Bearer <token> header.

 

POST /api/register 

POST /api/login (User login (returns JWT)) Public

POST /api/logout Auth

GET /api/user



Form Management Endpoints

These endpoints are protected by the auth:api middleware.

GET /api/forms

POST /api/forms
 

GET /api/forms/{id} 

PUT /api/forms/{id}

DELETE /api/forms/{id}
  
## Frontend Features

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

## Technical Decisions
[Your approach and reasoning]
## Deployment
**Platform**: [Vercel]
**Why this platform**: [Brief explanation]
**Deployment steps**: [How you deployed]
## Environment Variables
[Required configuration]
## Known Limitations
[What's not included and why]