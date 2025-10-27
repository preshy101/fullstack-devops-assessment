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