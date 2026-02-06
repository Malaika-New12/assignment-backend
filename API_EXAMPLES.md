# Example API Requests for MERN Auth Project

## Register a new user
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}

---

## Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "testuser@example.com",
  "password": "password123"
}

---

## Get all users (Protected)
GET http://localhost:5000/api/users
Authorization: Bearer <JWT_TOKEN_FROM_LOGIN>

---

# How to test with curl

# Register
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"testuser","email":"testuser@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"testuser@example.com","password":"password123"}'

# Get Users (replace <TOKEN> with your JWT)
curl -X GET http://localhost:5000/api/users -H "Authorization: Bearer <TOKEN>"
