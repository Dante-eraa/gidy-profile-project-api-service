# gidy-profile-project-api-service

Backend API service for the Gidy Profile Project built with Node.js, Express, Prisma ORM, and PostgreSQL.

---

## 📦 Tech Stack

- Node.js – JavaScript runtime environment
- Express.js – Backend framework for building REST APIs
- Prisma ORM – Database ORM and schema management
- PostgreSQL – Relational database
- JWT Authentication – Secure authentication using HTTP-only cookies
- Cloudinary – Image and resume storage
- OpenAI API – Generative AI integration for bio generation

---

## 🏗 Core Features

### 1️⃣ Authentication System

- User Registration
- User Login
- Secure JWT-based authentication
- HTTP-only cookie storage
- Protected routes using middleware
- Logout functionality

---

### 2️⃣ Profile Management

- Create profile
- Update profile
- Public profile access via slug
- Upload profile image
- Upload resume
- Career vision management

---

### 3️⃣ Experience, Education & Certification APIs

- Add / Update / Delete experiences
- Add / Update / Delete education
- Add / Update / Delete certifications
- Current working / studying handling
- Proper relational mapping using Prisma

---

### 4️⃣ Skill Endorsement System

- Add skill to profile
- Remove skill from profile
- Endorse a skill
- Remove endorsement
- Prevent self-endorsement
- Count endorsements dynamically
- Store endorsement records linked by userId

Database structure ensures:

- Each endorsement is uniquely tied to a user and a skill
- Duplicate endorsements are prevented
- Endorsement count is computed efficiently

---

### 5️⃣ AI-Powered Bio Generator

Integrated Generative AI to automatically generate professional bios.

Flow:

1. Frontend sends profile data (name, role, experience, career vision)
2. Backend constructs structured prompt
3. OpenAI API generates professional bio
4. Generated content is returned to frontend
5. User can save directly to profile

This reduces friction for users and improves overall profile quality.

---

## 🛠 Setup Instructions (Run Locally)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Dante-eraa/gidy-profile-project-api-service.git
cd gidy-profile-project-api-service
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/gidy_db"
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
OPENAI_API_KEY="your_openai_api_key"
PORT=5000
```

---

### 4️⃣ Run Prisma Migrations

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 5️⃣ Start Development Server

```bash
npm run dev
```

Server runs at:

```bash
http://localhost:5000
```

---

## 📁 Project Structure

├src/
│ │
│ ├── controllers/ # Route logic
│ ├── services/ # Business logic
│ ├── routes/ # API route definitions
│ ├── middleware/ # Authentication & error handling
│ ├── utils/ # Helper utilities
│ └── server.js # Entry point
├prisma/ # Prisma schema

---

## 🌐 API Base URL

http://localhost:5000/api

---

This backend is designed to be modular, scalable, and production-ready, supporting secure authentication, relational data management, AI integration, and real-time interaction features for the Gidy Profile platform.
