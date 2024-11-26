# Contact Manager App Backend

Welcome to the **Contact Manager App Backend**! This is a backend server built for managing contacts, providing secure user authentication and CRUD operations for contacts. It's designed to allow users to manage their contact information while ensuring security through authentication middleware.

## Features

- **User Authentication**: Secure sign-up, login, and logout functionality.
- **CRUD Operations**: Create, Read, Update, and Delete operations for managing contacts.
- **Secure Endpoints**: Protected routes utilizing authentication middleware to ensure secure access.
- **API Documentation**: Comprehensive documentation to help you interact with the API.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database to store user and contact information.
- **JSON Web Tokens (JWT)**: Used for user authentication and managing sessions.
- **bcrypt**: Secure password hashing and comparison for authentication.

## How to Use

### 1. Clone the repository:
   ```bash
   https://github.com/SkamAbhi/mycontacts-backend.git
```

### 2. Install dependencies:
   ```bash
   npm install
```

 ### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```bash
PORT=<your_port> 
CONNECTION_STRING=<your_database_connection_string>
ACCESS_TOKEN_SECRET=<your_jwt_secret_key>
```

### 4. Start the Server:
   ```bash
   npm start
```
# API Documentation

## Authentication Endpoints

### Sign Up

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body Parameters**:
  - `user` (string): User's username.
  - `email` (string): User's email address.
  - `password` (string): User's password.

### Log In

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body Parameters**:
  - `email` (string): User's email address.
  - `password` (string): User's password.

### Update User

- **URL**: `/api/users/update`
- **Method**: `PUT`
- **Headers**:
  - `Authorization`: Bearer token obtained after logging in.
- **Body Parameters**:
  - `user` (string, optional): New username.
  - `email` (string, optional): New email address.
  - `password` (string, optional): New password.

### Log Out

- **URL**: `/api/auth/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: Bearer token obtained after logging in.

---

## Contact Endpoints

### Get All Contacts

- **URL**: `/api/contacts`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: Bearer token obtained after logging in.

### Get Single Contact

- **URL**: `/api/contacts/:contactId`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: Bearer token obtained after logging in.

### Create Contact

- **URL**: `/api/contacts`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: Bearer token obtained after logging in.
- **Body Parameters**:
  - `name` (string): Contact's name.
  - `email` (string): Contact's email address.
  - `phone` (string): Contact's phone number.

### Update Contact

- **URL**: `/api/contacts/:contactId`
- **Method**: `PUT`
- **Headers**:
  - `Authorization`: Bearer token obtained after logging in.
- **Body Parameters**:
  - `name` (string, optional): Contact's name.
  - `email` (string, optional): Contact's email address.
  - `phone` (string, optional): Contact's phone number.

### Delete Contact

- **URL**: `/api/contacts/:contactId`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: Bearer token obtained after logging in.

---

## Notes

- All endpoints except the sign-up and login require an authentication token obtained after logging in.
- Tokens should be sent in the `Authorization` header as a `Bearer token`.

