# Implement Design
 
A full-stack monorepo project that implements Figma designs into a functional web application.
The frontend uses **Next.js 14+ App Router**, **Redux Toolkit** for state management, **PrimeReact** for UI components, and **NextAuth.js** for authentication (planned). The backend is powered by **NestJS** with **TypeORM** and exposes a versioned REST API.
 
---
 
## Table of Contents
 
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Backend API](#backend-api)
  - [Entities](#entities)
  - [DTOs](#dtos)
  - [Services](#services)
  - [Controllers & Endpoints](#controllers--endpoints)
  - [Example JSON Payloads](#example-json-payloads)
- [Authentication](#authentication)
- [State Management](#state-management)
- [UI Components](#ui-components)
- [Future Enhancements](#future-enhancements)
---
 
## Project Overview
 
This project translates Figma design mockups into a modern, responsive web application. It is structured as a monorepo with a clear client/server split:
 
- The **client** (Next.js) handles the UI, routing, and frontend state.
- The **server** (NestJS) provides a versioned REST API backed by a relational database via TypeORM.
The primary domain is a **news/article platform** — supporting full CRUD for articles, authors, categories, and article images — alongside a clean authentication flow and reusable UI components.
 
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 14+ (App Router) |
| Backend Framework | NestJS |
| Language | TypeScript (both client and server) |
| State Management | Redux Toolkit |
| UI Components | PrimeReact, PrimeIcons |
| Authentication | NextAuth.js *(planned)* |
| ORM | TypeORM |
| Styling | PrimeReact theme + global CSS |
 
---
 
## Features
 
- Login page
- Password reset page
- News dashboard with global side navigation bar
- News article details page
- Full CRUD REST API for articles, authors, categories, and article images
- Versioned API endpoints under `/api/v1`
- Modular and reusable UI components
- Global state management with Redux Toolkit
---
 
## Getting Started
 
### Prerequisites
 
- Node.js >= 18
- npm or yarn
- A running relational database supported by TypeORM (e.g. PostgreSQL, MySQL)
### 1. Clone the repository
 
```bash
git clone <repository-url>
cd <repository-name>
```
 
### 2. Install dependencies
 
Install dependencies for both client and server from the monorepo root, or navigate into each workspace:
 
```bash
# From root (if workspace scripts are configured)
npm install
 
# Or individually
cd client && npm install
cd ../server && npm install
```
 
### 3. Configure environment variables
 
Create a `.env` file in the `server` directory based on the provided `.env.example`:
 
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_db
```
 
### 4. Run the development servers
 
**Backend (NestJS):**
 
```bash
cd server
npm run start:dev
```
 
**Frontend (Next.js):**
 
```bash
cd client
npm run dev
```
 
The client will be available at `http://localhost:3000` and the API at `http://localhost:3001/api/v1` by default.
 
---
 
## Folder Structure
 
```
root/
├── client/                         # Next.js frontend
│   ├── app/                        # App Router pages and layouts
│   │   ├── (auth)/                 # Auth route group (login, reset-password)
│   │   ├── dashboard/              # News dashboard
│   │   └── layout.tsx              # Root layout
│   ├── components/                 # Reusable UI components
│   ├── lib/                        # Utilities and helpers
│   ├── store/                      # Redux Toolkit store and slices
│   │   ├── store.ts
│   │   └── slices/
│   ├── public/                     # Static assets
│   ├── styles/                     # Global CSS
│   └── next.config.ts
│
├── server/                         # NestJS backend
│   ├── src/
│   │   ├── article/                # Article module
│   │   │   ├── article.controller.ts
│   │   │   ├── article.service.ts
│   │   │   ├── article.module.ts
│   │   │   ├── entities/
│   │   │   │   └── article.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-article.dto.ts
│   │   │       └── update-article.dto.ts
│   │   ├── article-image/          # ArticleImage module
│   │   ├── author/                 # Author module
│   │   ├── category/               # Category module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── tsconfig.json
│
└── package.json                    # Root workspace config (if applicable)
```
 
---
 
## Backend API
 
All endpoints are prefixed with `/api/v1`.
 
### Entities
 
#### Article
 
| Field | Type | Description |
|---|---|---|
| `id` | `number` | Primary key, auto-incremented |
| `title` | `string` | Article title |
| `content` | `string` | Full article content |
| `excerpt` | `string` | Short summary or preview |
| `created_at` | `timestamp` | Creation timestamp |
| `author` | `Author` | Many-to-One relation |
| `category` | `Category` | Many-to-One relation |
| `images` | `ArticleImage[]` | One-to-Many relation |
 
#### ArticleImage
 
| Field | Type | Description |
|---|---|---|
| `id` | `number` | Primary key, auto-incremented |
| `file_name` | `string` | Original file name |
| `storage_path` | `string` | Path or URL in storage |
| `article` | `Article` | Many-to-One relation |
 
#### Category
 
| Field | Type | Description |
|---|---|---|
| `id` | `number` | Primary key, auto-incremented |
| `name` | `string` | Category name |
 
#### Author
 
| Field | Type | Description |
|---|---|---|
| `id` | `number` | Primary key, auto-incremented |
| `first_name` | `string` | Author's first name |
| `last_name` | `string` | Author's last name |
| `articles` | `Article[]` | One-to-Many relation |
 
---
 
### DTOs
 
Each entity has a `CreateDto` (required fields) and an `UpdateDto` (all fields optional, via `PartialType`).
 
**CreateArticleDto**
 
```typescript
{
  title: string;
  content: string;
  excerpt: string;
  authorId: number;
  categoryId: number;
}
```
 
**UpdateArticleDto** — All fields from `CreateArticleDto` are optional.
 
**CreateArticleImageDto**
 
```typescript
{
  file_name: string;
  storage_path: string;
  articleId: number;
}
```
 
**CreateCategoryDto**
 
```typescript
{
  name: string;
}
```
 
**CreateAuthorDto**
 
```typescript
{
  first_name: string;
  last_name: string;
}
```
 
---
 
### Services
 
Each module provides a service with the following standard CRUD methods:
 
| Method | Description |
|---|---|
| `create(dto)` | Creates and saves a new entity record |
| `findAll()` | Returns all records, with relations eager-loaded |
| `findOne(id)` | Returns a single record by ID, or throws `NotFoundException` |
| `update(id, dto)` | Updates an existing record by ID |
| `remove(id)` | Deletes a record by ID |
 
---
 
### Controllers & Endpoints
 
#### Articles — `/api/v1/article`
 
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/article` | Create a new article |
| `GET` | `/api/v1/article` | Retrieve all articles |
| `GET` | `/api/v1/article/:id` | Retrieve a single article by ID |
| `PATCH` | `/api/v1/article/:id` | Update an article by ID |
| `DELETE` | `/api/v1/article/:id` | Delete an article by ID |
 
#### Article Images — `/api/v1/article_images`
 
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/article_images` | Upload/create a new article image |
| `GET` | `/api/v1/article_images` | Retrieve all article images |
| `GET` | `/api/v1/article_images/:id` | Retrieve a single image by ID |
| `PATCH` | `/api/v1/article_images/:id` | Update image metadata by ID |
| `DELETE` | `/api/v1/article_images/:id` | Delete an image record by ID |
 
#### Categories — `/api/v1/category`
 
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/category` | Create a new category |
| `GET` | `/api/v1/category` | Retrieve all categories |
| `GET` | `/api/v1/category/:id` | Retrieve a single category by ID |
| `PATCH` | `/api/v1/category/:id` | Update a category by ID |
| `DELETE` | `/api/v1/category/:id` | Delete a category by ID |
 
#### Authors — `/api/v1/author`
 
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/author` | Create a new author |
| `GET` | `/api/v1/author` | Retrieve all authors |
| `GET` | `/api/v1/author/:id` | Retrieve a single author by ID |
| `PATCH` | `/api/v1/author/:id` | Update an author by ID |
| `DELETE` | `/api/v1/author/:id` | Delete an author by ID |
 
---
 
### Example JSON Payloads
 
#### Create Article
 
**Request — `POST /api/v1/article`**
 
```json
{
  "title": "Breaking: New Climate Agreement Signed",
  "content": "World leaders gathered today to sign a landmark climate agreement...",
  "excerpt": "A historic climate deal was signed by 120 nations.",
  "authorId": 1,
  "categoryId": 2
}
```
 
**Response — `201 Created`**
 
```json
{
  "id": 10,
  "title": "Breaking: New Climate Agreement Signed",
  "content": "World leaders gathered today to sign a landmark climate agreement...",
  "excerpt": "A historic climate deal was signed by 120 nations.",
  "created_at": "2024-08-15T09:30:00.000Z",
  "author": {
    "id": 1,
    "first_name": "Jane",
    "last_name": "Doe"
  },
  "category": {
    "id": 2,
    "name": "World"
  },
  "images": []
}
```
 
#### Create Article Image
 
**Request — `POST /api/v1/article_images`**
 
```json
{
  "file_name": "climate-summit.jpg",
  "storage_path": "/uploads/articles/climate-summit.jpg",
  "articleId": 10
}
```
 
**Response — `201 Created`**
 
```json
{
  "id": 5,
  "file_name": "climate-summit.jpg",
  "storage_path": "/uploads/articles/climate-summit.jpg",
  "article": {
    "id": 10,
    "title": "Breaking: New Climate Agreement Signed"
  }
}
```
 
#### Create Category
 
**Request — `POST /api/v1/category`**
 
```json
{
  "name": "Technology"
}
```
 
**Response — `201 Created`**
 
```json
{
  "id": 3,
  "name": "Technology"
}
```
 
#### Create Author
 
**Request — `POST /api/v1/author`**
 
```json
{
  "first_name": "John",
  "last_name": "Smith"
}
```
 
**Response — `201 Created`**
 
```json
{
  "id": 2,
  "first_name": "John",
  "last_name": "Smith",
  "articles": []
}
```
 
#### Update Article (Partial)
 
**Request — `PATCH /api/v1/article/10`**
 
```json
{
  "title": "Updated: Climate Agreement Details Emerge",
  "excerpt": "New details about the landmark climate deal have surfaced."
}
```
 
**Response — `200 OK`**
 
```json
{
  "id": 10,
  "title": "Updated: Climate Agreement Details Emerge",
  "content": "World leaders gathered today to sign a landmark climate agreement...",
  "excerpt": "New details about the landmark climate deal have surfaced.",
  "created_at": "2024-08-15T09:30:00.000Z"
}
```
 
---
 
## Authentication
 
Authentication is planned using **NextAuth.js** on the frontend. This will provide:
 
- Session-based authentication with support for multiple providers (credentials, OAuth)
- Protected routes using Next.js middleware
- JWT or database session strategy (TBD)
- Integration with the NestJS backend for token validation
> **Status:** TODO — not yet implemented.
 
---
 
## State Management
 
Global state is managed with **Redux Toolkit**. The store is organized into feature slices and located in `client/store/slices/`. Each slice handles a domain-specific area (e.g. articles, UI state, auth session).
 
---
 
## UI Components
 
The frontend uses **PrimeReact** as the primary component library, paired with **PrimeIcons** for iconography. An official PrimeReact theme is applied globally. Custom overrides and additional styling are handled through global CSS files in `client/styles/`.
 
---
 
## Future Enhancements
 
- Implement NextAuth.js authentication flow (login, session, protected routes)
- Add file upload support for article images (e.g. Multer on the NestJS side)
- Add pagination and filtering to `findAll` endpoints
- Add role-based access control (RBAC) to API endpoints
- Add input validation with `class-validator` and `class-transformer` in all DTOs
- Add Swagger/OpenAPI documentation to the NestJS API
- Write unit and e2e tests for both client and server
- Set up CI/CD pipeline
- Containerize the application with Docker and Docker Compose