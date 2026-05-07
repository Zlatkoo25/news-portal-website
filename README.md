# News Portal — Complete Project Documentation

**Repository:**  
<https://github.com/Zlatkoo25/news-portal-website.git>

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Features](#3-features)
4. [Architecture Decisions](#4-architecture-decisions)
5. [Authentication System](#5-authentication-system)
6. [Getting Started](#6-getting-started)
7. [Folder Structure](#7-folder-structure)
8. [Backend API Documentation](#8-backend-api-documentation)
9. [Frontend Development Guide](#9-frontend-development-guide)
10. [Future Enhancements](#10-future-enhancements)
11. [Troubleshooting](#11-troubleshooting)
12. [Contributing Guidelines](#12-contributing-guidelines)

---

# 1. Project Overview

This project translates Figma design mockups into a modern, responsive news platform web application. It is structured as a monorepo with a clear separation between frontend and backend services.

The project evolved incrementally from static UI development into a fully integrated full-stack application with backend API communication, JWT authentication, protected routes, dynamic article rendering, and user profile management.

The repository is divided into two major applications:

- `client/` — Next.js frontend using the App Router
- `server/` — NestJS backend exposing a REST API under `/api/v1`

The application currently supports:

- User authentication
- News dashboard rendering
- Dynamic article pages
- Image rendering
- CRUD operations for articles, authors, and categories
- Protected backend routes
- Frontend validation
- Profile management

---

# 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | Next.js (App Router) | 14.x |
| Backend Framework | NestJS | 10.x |
| Language | TypeScript | 5.x |
| Database | PostgreSQL | — |
| ORM | TypeORM | 0.3.x |
| UI Library | PrimeReact | 10.x |
| Icons | PrimeIcons | — |
| Authentication | JWT (custom implementation) | — |
| State Management | React Hooks + Context API | — |
| Styling | CSS + PrimeReact Theme | — |

---

# 3. Features

## Frontend

- Login page
- Password reset page
- Dashboard layout
- Sidebar navigation
- Header component
- Dashboard article table
- News article cards
- Dynamic article details page
- Frontend validation
- Responsive layouts
- Background image support for authentication pages
- Profile page
- API-integrated authentication flow

---

## Backend

- JWT authentication
- Custom NestJS guards
- REST API endpoints
- CRUD operations
- Article retrieval
- Category management
- Author management
- User profile updates
- Token expiration configuration
- Structured modular architecture
- Versioned API routes

---

## Infrastructure

- Monorepo architecture
- Client/server separation
- Environment variable configuration
- Hot reload development environment
- Shared TypeScript ecosystem

---

# 4. Architecture Decisions

| Decision | Rationale |
|---|---|
| Monorepo structure | Keeps frontend and backend logically connected while maintaining separation of concerns |
| Next.js App Router | Supports layouts, nested routes, and modern React architecture |
| NestJS backend | Provides scalable modular backend structure |
| TypeORM | Simplifies relational database interaction |
| Custom JWT authentication | Allows full control over authentication flow without Passport.js abstraction |
| React Context API | Sufficient for current application complexity without additional state libraries |
| PrimeReact | Accelerates UI implementation and dashboard composition |
| Separate frontend/backend ports | Prevents local development conflicts |

---

# 5. Authentication System

## Authentication Tokens

The authentication system uses two JWT tokens:

### Access Token

- Short-lived token
- Used for authenticated API requests
- Sent in the `Authorization` header

### Refresh Token

- Longer-lived token
- Used to generate new access tokens
- Helps maintain persistent user sessions without requiring repeated logins

The authentication system evolved from a mock frontend login API into a fully integrated backend-authenticated flow.

---

## Authentication Features

- JWT login system
- Protected backend routes
- Custom NestJS guards
- Access token validation
- Password verification
- Frontend authentication persistence
- Login API integration
- Profile route protection
- Token expiration configuration

---

## Authentication Flow

1. User submits login credentials
2. Backend validates credentials
3. Passwords are verified securely
4. JWT access token is generated
5. Client stores token
6. Protected routes validate the JWT through custom guards

---

## Example Login Request

```http
POST /api/v1/auth/login
```

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Example Login Response

```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

## Example Refresh Endpoint

```http
POST /api/v1/auth/refresh
```

### Request

```json
{
  "refresh_token": "refresh_token_here"
}
```

### Response

```json
{
  "access_token": "new_access_token",
  "refresh_token": "new_refresh_token"
}
```

---

## Example Guard

```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);

      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

---

## Environment Variables

```env
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

# 6. Getting Started

## Prerequisites

- Node.js >= 18
- PostgreSQL
- Git

---

## Clone Repository

```bash
git clone https://github.com/Zlatkoo25/news-portal-website.git
cd news-portal-website
```

---

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## Backend Environment Configuration

Create `/server/.env`

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=news_portal

PORT=3002

JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d

JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## Frontend Environment Configuration

Create `/client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
```

---

## Start Backend

```bash
cd server
npm run start:dev
```

Runs on:

```text
http://localhost:3002
```

---

## Start Frontend

```bash
cd client
npm run dev
```

Runs on:

```text
http://localhost:3000
```

---

# 7. Folder Structure

```text
news-portal-website/
│
├── client/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── article/[id]/
│   │   ├── profile/
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── articles/
│   │   ├── dashboard/
│   │   └── common/
│   │
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── article/
│   │   ├── article-image/
│   │   ├── author/
│   │   ├── category/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── guards/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env
│   └── package.json
│
└── documentation/
```

---

# 8. Backend API Documentation

## Base URL

```text
http://localhost:3002/api/v1
```

---

## Core Resources

- Articles
- Authors
- Categories
- Article Images
- Authentication
- Users

---

## Example Article Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/article` | Retrieve all articles |
| GET | `/api/v1/article/:id` | Retrieve single article |
| POST | `/api/v1/article` | Create article |
| PATCH | `/api/v1/article/:id` | Update article |
| DELETE | `/api/v1/article/:id` | Delete article |

---

## Example Authentication Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/login` | Authenticate user |
| GET | `/api/v1/auth/me` | Retrieve authenticated user |
| PATCH | `/api/v1/user/:id` | Update user information |

---

## Example Create Article Request

```json
{
  "title": "Breaking News",
  "content": "Article content here",
  "excerpt": "Short summary",
  "authorId": 1,
  "categoryId": 2
}
```

---

## Example Response

```json
{
  "id": 10,
  "title": "Breaking News",
  "excerpt": "Short summary"
}
```

---

## Response Status Codes

| Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Validation error |
| 401 | Unauthorized |
| 404 | Resource not found |
| 500 | Internal server error |

---

# 9. Frontend Development Guide

## State Management

The application intentionally avoids external state management libraries.

| Use Case | Approach |
|---|---|
| Local component state | `useState` |
| Shared application state | `useContext` |
| Complex state transitions | `useReducer` |
| Server data fetching | `fetch` + Next.js routing |
| Shared logic | Custom hooks |

---

## Routing

| Route | Description |
|---|---|
| `/login` | Login page |
| `/reset-password` | Password reset |
| `/dashboard` | Dashboard page |
| `/article/[id]` | Article details |
| `/profile` | User profile |

---

## UI Components

Commonly used PrimeReact components:

- DataTable
- Sidebar
- Card
- Button
- InputText
- Password
- Dialog
- Toast

---

## Frontend Validation

Frontend validation is implemented directly within form components before API requests are sent.

Validation includes:

- Required field checks
- Password validation
- Input sanitization
- Error handling
- API response messaging

---

# 10. Future Enhancements

## Short-Term

- File upload support
- DTO validation expansion
- Improved profile management
- Better dashboard filtering

---

## Medium-Term

- Pagination support
- Search functionality
- Role-based authorization
- Swagger/OpenAPI documentation

---

## Long-Term

- Automated testing
- Docker deployment
- Redis caching
- CI/CD pipelines
- Real-time notifications

---

# 11. Troubleshooting

| Problem | Solution |
|---|---|
| Backend not starting | Check `.env` configuration |
| Database connection failure | Verify PostgreSQL credentials |
| Frontend API requests failing | Confirm backend server is running |
| Unauthorized requests | Verify JWT token validity |
| Missing styles | Ensure PrimeReact CSS imports exist |
| Port conflicts | Change local port configuration |

---

# 12. Contributing Guidelines

## Contribution Workflow

```bash
git checkout -b feat/amazing-feature
git commit -m "feat: Add amazing feature"
git push origin feat/amazing-feature
```

Then open a Pull Request.

---

## Coding Standards

- Use strict TypeScript
- Prefer functional React components
- Follow NestJS modular structure
- Keep components reusable
- Maintain consistent API response structure
- Refactor when necessary to preserve scalability

---
