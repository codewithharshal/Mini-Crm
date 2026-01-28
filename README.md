# Mini CRM API

A comprehensive Customer Relationship Management (CRM) system built with NestJS, Prisma, and PostgreSQL. This API provides robust features for managing users, customers, and tasks with role-based access control and JWT authentication.

## 🚀 Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Role-Based Access Control**: Admin and Employee roles with different permissions
- **User Management**: Create, read, and update user information
- **Customer Management**: Full CRUD operations for customer data with pagination
- **Task Management**: Assign and track tasks with status updates
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database Migrations**: Prisma ORM for type-safe database operations

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Mini-CRM
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/crm_db?schema=public"
PORT=3000
JWT_SECRET=your_jwt_secret_key_change_in_production
```

**Environment Variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/crm_db?schema=public` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | Secret key for JWT token generation | `your_secure_secret_key` |

### 4. Database Setup & Migration

Run Prisma migrations to set up your database schema:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

**Note:** The migration will create the following tables:
- `users` - User accounts with authentication
- `customers` - Customer information
- `tasks` - Task assignments and tracking

## 🚀 Running the Application

### Development Mode (with hot-reload)

```bash
npm run start:dev
```

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm run start:prod
```

### Standard Mode

```bash
npm run start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## 📚 API Documentation

### Swagger UI

Once the server is running, access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Interactive API testing
- JWT authentication integration

### API Endpoints Overview

#### Authentication (`/auths`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auths/register` | Register a new user | No |
| POST | `/auths/login` | Login and receive JWT token | No |

#### Users (`/users`) - Admin Only

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes (Admin) |
| GET | `/users/:id` | Get user by ID | Yes (Admin) |
| PATCH | `/users/:id` | Update user role | Yes (Admin) |

#### Customers (`/customers`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/customers?page=1&limit=10` | Get customers (paginated) | Yes |
| POST | `/customers/create` | Create a new customer | Yes (Admin) |
| GET | `/customers/:id` | Get customer by ID | Yes |
| PATCH | `/customers/:id` | Update customer | Yes (Admin) |
| DELETE | `/customers/delete/:id` | Delete customer | Yes (Admin) |

#### Tasks (`/tasks`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks` | Create a new task | Yes (Admin) |
| GET | `/tasks` | Get tasks (Admin: all, Employee: own) | Yes |
| PATCH | `/tasks/:id/status` | Update task status | Yes |


## 🗃️ Database Schema

### User Model
- `user_id` (Primary Key)
- `name`
- `email` (Unique)
- `password` (Hashed with bcrypt)
- `role` (ADMIN | EMPLOYEE)
- `createdAt`, `updatedAt`

### Customer Model
- `customer_id` (Primary Key)
- `name`
- `email` (Unique)
- `phone` (Unique)
- `company`
- `createdAt`, `updatedAt`

### Task Model
- `id` (Primary Key)
- `title`
- `description`
- `status` (PENDING | IN_PROGRESS | DONE)
- `assignedToId` (Foreign Key to User)
- `customerId` (Foreign Key to Customer)
- `createdAt`, `updatedAt`

## 🛡️ Role-Based Access Control

### Admin Permissions
- All User operations (view, update roles)
- Create, update, and delete customers
- Create tasks
- View all tasks
- Update any task status

### Employee Permissions
- View customers
- View own tasks
- Update own task status

## 🔧 Development

### Project Structure

```
src/
├── auth/           # Authentication module (JWT, guards, strategies)
├── users/          # User management module
├── customers/      # Customer management module
├── tasks/          # Task management module
├── prisma/         # Prisma service
├── app.module.ts   # Root module
└── main.ts         # Application entry point
```

### Code Formatting

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## 📦 Technologies Used

- **Framework**: [NestJS](https://nestjs.com/) v11
- **ORM**: [Prisma](https://www.prisma.io/) v7
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Language**: TypeScript

## 📄 License

This project is UNLICENSED and is for educational/demonstration purposes.

## 👤 Author

[Harshal sewatkar](https://github.com/codewithharshal)

## 🤝 Support

For questions or issues, please open an issue on the GitHub repository.

---

**Happy Coding! 🚀**
