# Auth System

A simple authentication system using **React**, **Vite**, **Express**, **MongoDB**, **JWT**, **bcrypt**, and **Nodemailer** for email sending. Users can register, log in, reset passwords, and more.

## Features
- **JWT Authentication** for secure login.
- **bcrypt** for password hashing.
- **Nodemailer** to send emails (e.g., password reset).
- **MongoDB** for user data storage.

## How to Run the Project

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/auth-system.git
cd auth-system
```
## Setup frontend
```bash
VITE_BACKEND_URL=http://localhost:4000
```

## Setup Backend


```bash
MONGO_USERNAME=your_username
MONGO_PASSWORD=your_password
JWT_SECRET=your_secret_token
```
## Initialize 
```bash
cd client
npm run dev
# or
yarn dev

cd server
npm run start
# or
yarn start

```


