# Online Food Ordering System (Next.js + MongoDB)

This project is an Online Food Ordering System built with:

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **REST API**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **bcrypt (password hashing)**
* **React Hook Form + Zod (validation)**
* **React Hot Toast (notifications)**
* **Context API (state management)**

## Current Status

* Project bootstrapped and running.
* Home page UI updated.
* Core dependencies installed.

## Setup

### 1) Environment Variables

Create a `.env.local` file in `my-app/`:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### 2) Run the Development Server

```bash
npm run dev
```

Open: `http://localhost:3000`

## Lint

```bash
npm run lint
```

## Notes

* If you enable additional lint rules, you may see warnings related to React Hook dependencies.
