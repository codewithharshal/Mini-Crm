# Mini CRM API - Complete API Documentation

This document provides comprehensive API documentation with example curl commands for all endpoints in the Mini CRM application.

## Base URL

```
http://localhost:3000
```

## Authentication

Most endpoints require JWT authentication. After logging in, you'll receive a JWT token that must be included in the `Authorization` header for protected endpoints.

### Header Format
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 1. Authentication Endpoints

### 1.1 Register a New User

**Endpoint:** `POST /auths/register`  
**Authentication:** Not required  
**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123",
  "role": "EMPLOYEE"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:3000/auths/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "role": "EMPLOYEE"
  }'
```

**Response (201 Created):**
```json
{
  "user_id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "EMPLOYEE",
  "createdAt": "2024-01-28T10:30:00.000Z",
  "updatedAt": "2024-01-28T10:30:00.000Z"
}
```

**Possible Roles:**
- `ADMIN` - Full access to all features
- `EMPLOYEE` - Limited access (can view customers and manage own tasks)

---

### 1.2 Login

**Endpoint:** `POST /auths/login`  
**Authentication:** Not required  
**Description:** Login with email and password to receive JWT token

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:3000/auths/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123"
  }'
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiRU1QTE9ZRUUiLCJpYXQiOjE3MDYyNzQwMDAsImV4cCI6MTcwNjI3NzYwMH0.abc123def456"
}
```

---

## 2. User Management Endpoints (Admin Only)

All user management endpoints require **Admin** role.

### 2.1 Get All Users

**Endpoint:** `GET /users`  
**Authentication:** Required (Admin only)  
**Description:** Retrieve a list of all users

**Curl Command:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
[
  {
    "user_id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "EMPLOYEE",
    "createdAt": "2024-01-28T10:30:00.000Z",
    "updatedAt": "2024-01-28T10:30:00.000Z"
  },
  {
    "user_id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "role": "ADMIN",
    "createdAt": "2024-01-28T11:00:00.000Z",
    "updatedAt": "2024-01-28T11:00:00.000Z"
  }
]
```

---

### 2.2 Get User by ID

**Endpoint:** `GET /users/:id`  
**Authentication:** Required (Admin only)  
**Description:** Retrieve a specific user by their ID

**Curl Command:**
```bash
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "user_id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "EMPLOYEE",
  "createdAt": "2024-01-28T10:30:00.000Z",
  "updatedAt": "2024-01-28T10:30:00.000Z"
}
```

---

### 2.3 Update User Role

**Endpoint:** `PATCH /users/:id`  
**Authentication:** Required (Admin only)  
**Description:** Update a user's role

**Request Body:**
```json
{
  "role": "ADMIN"
}
```

**Curl Command:**
```bash
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "role": "ADMIN"
  }'
```

**Response (200 OK):**
```json
{
  "user_id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "ADMIN",
  "createdAt": "2024-01-28T10:30:00.000Z",
  "updatedAt": "2024-01-28T12:00:00.000Z"
}
```

---

## 3. Customer Management Endpoints

### 3.1 Get Customers (Paginated)

**Endpoint:** `GET /customers?page={page}&limit={limit}`  
**Authentication:** Required  
**Description:** Retrieve customers with pagination

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Curl Command:**
```bash
curl -X GET "http://localhost:3000/customers?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "customer_id": 1,
      "name": "Acme Corporation",
      "email": "contact@acme.com",
      "phone": 1234567890,
      "company": "Acme Corp",
      "createdAt": "2024-01-28T10:00:00.000Z",
      "updatedAt": "2024-01-28T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

### 3.2 Create Customer

**Endpoint:** `POST /customers/create`  
**Authentication:** Required (Admin only)  
**Description:** Create a new customer

**Request Body:**
```json
{
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "phone": 1234567890,
  "company": "Acme Corp"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:3000/customers/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "phone": 1234567890,
    "company": "Acme Corp"
  }'
```

**Response (201 Created):**
```json
{
  "customer_id": 1,
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "phone": 1234567890,
  "company": "Acme Corp",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

---

### 3.3 Get Customer by ID

**Endpoint:** `GET /customers/:id`  
**Authentication:** Required  
**Description:** Retrieve a specific customer by ID

**Curl Command:**
```bash
curl -X GET http://localhost:3000/customers/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "customer_id": 1,
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "phone": 1234567890,
  "company": "Acme Corp",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

---

### 3.4 Update Customer

**Endpoint:** `PATCH /customers/:id`  
**Authentication:** Required (Admin only)  
**Description:** Update customer information

**Request Body (all fields optional):**
```json
{
  "name": "Acme Corporation Ltd",
  "email": "info@acme.com",
  "phone": 9876543210,
  "company": "Acme Corporation"
}
```

**Curl Command:**
```bash
curl -X PATCH http://localhost:3000/customers/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Acme Corporation Ltd",
    "email": "info@acme.com"
  }'
```

**Response (200 OK):**
```json
{
  "customer_id": 1,
  "name": "Acme Corporation Ltd",
  "email": "info@acme.com",
  "phone": 1234567890,
  "company": "Acme Corp",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T14:00:00.000Z"
}
```

---

### 3.5 Delete Customer

**Endpoint:** `DELETE /customers/delete/:id`  
**Authentication:** Required (Admin only)  
**Description:** Delete a customer

**Curl Command:**
```bash
curl -X DELETE http://localhost:3000/customers/delete/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "message": "Customer deleted successfully",
  "customer_id": 1
}
```

---

## 4. Task Management Endpoints

### 4.1 Create Task

**Endpoint:** `POST /tasks`  
**Authentication:** Required (Admin only)  
**Description:** Create a new task and assign it to a user

**Request Body:**
```json
{
  "title": "Follow up with client",
  "description": "Schedule a meeting to discuss project requirements",
  "assignedToId": 1,
  "customerId": 1,
  "status": "PENDING"
}
```

**Curl Command:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Follow up with client",
    "description": "Schedule a meeting to discuss project requirements",
    "assignedToId": 1,
    "customerId": 1,
    "status": "PENDING"
  }'
```

**Response (201 Created):**
```json
{
  "id": 1,
  "title": "Follow up with client",
  "description": "Schedule a meeting to discuss project requirements",
  "status": "PENDING",
  "assignedToId": 1,
  "customerId": 1,
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

**Task Status Options:**
- `PENDING` - Task not started
- `IN_PROGRESS` - Task is being worked on
- `DONE` - Task completed

---

### 4.2 Get Tasks

**Endpoint:** `GET /tasks`  
**Authentication:** Required  
**Description:** Get tasks based on user role
- **Admin**: Returns all tasks
- **Employee**: Returns only tasks assigned to them

**Curl Command:**
```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Follow up with client",
    "description": "Schedule a meeting to discuss project requirements",
    "status": "PENDING",
    "assignedToId": 1,
    "customerId": 1,
    "assignedTo": {
      "user_id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "customer": {
      "customer_id": 1,
      "name": "Acme Corporation",
      "email": "contact@acme.com"
    },
    "createdAt": "2024-01-28T10:00:00.000Z",
    "updatedAt": "2024-01-28T10:00:00.000Z"
  }
]
```

---

### 4.3 Update Task Status

**Endpoint:** `PATCH /tasks/:id/status`  
**Authentication:** Required  
**Description:** Update task status
- **Admin**: Can update any task
- **Employee**: Can only update their own tasks

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Curl Command:**
```bash
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "IN_PROGRESS"
  }'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Follow up with client",
  "description": "Schedule a meeting to discuss project requirements",
  "status": "IN_PROGRESS",
  "assignedToId": 1,
  "customerId": 1,
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T15:00:00.000Z"
}
```

---

## Complete Workflow Example

Here's a complete workflow showing how to use the API:

```bash
# 1. Register an admin user
curl -X POST http://localhost:3000/auths/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@crm.com",
    "password": "AdminPass123",
    "role": "ADMIN"
  }'

# 2. Login to get JWT token
TOKEN=$(curl -X POST http://localhost:3000/auths/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@crm.com",
    "password": "AdminPass123"
  }' | jq -r '.access_token')

# 3. Create a customer
curl -X POST http://localhost:3000/customers/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Tech Solutions Inc",
    "email": "contact@techsolutions.com",
    "phone": 5551234567,
    "company": "Tech Solutions"
  }'

# 4. Register an employee
curl -X POST http://localhost:3000/auths/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Employee User",
    "email": "employee@crm.com",
    "password": "EmpPass123",
    "role": "EMPLOYEE"
  }'

# 5. Create a task and assign to employee
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Initial client consultation",
    "description": "Meet with Tech Solutions to understand their needs",
    "assignedToId": 2,
    "customerId": 1,
    "status": "PENDING"
  }'

# 6. Get all tasks
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer $TOKEN"

# 7. Update task status
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "status": "DONE"
  }'
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be a valid email"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

---

## API Testing Tips

1. **Use Environment Variables**: Store your JWT token in an environment variable for easier testing
   ```bash
   export TOKEN="your_jwt_token_here"
   curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/users
   ```

2. **Pretty Print JSON**: Use `jq` for readable JSON output
   ```bash
   curl http://localhost:3000/customers | jq
   ```

3. **Save Token Automatically**: Extract token from login response
   ```bash
   TOKEN=$(curl -X POST http://localhost:3000/auths/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@crm.com","password":"AdminPass123"}' \
     | jq -r '.access_token')
   ```

4. **Use Swagger UI**: For interactive testing, visit `http://localhost:3000/api-docs`

---

## Need Help?

- **Swagger Documentation**: Visit `http://localhost:3000/api-docs` for interactive API documentation
- **GitHub Issues**: Report bugs or request features on the repository

