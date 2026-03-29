# MERN Blog Application

A full-stack **Blog Application** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**.
The application allows users to read blogs, like and comment on posts, while administrators have full control over blog management and users.

## 🚀 Features

### 👤 User Features

* User registration and login
* Secure authentication using **JWT (JSON Web Token)**
* View all blogs
* Like blogs
* Comment on blogs
* Responsive UI for mobile and desktop

### 🛠 Admin Features

* Admin login
* Create new blog posts
* Edit existing blogs
* Delete blogs
* View all comments
* Delete inappropriate comments
* View all registered users
* Delete users if necessary

## 🔐 Authentication

Authentication is implemented using **JWT** to ensure secure login and protected routes for both users and admin.

## 🧱 Tech Stack

### Frontend

* React
* CSS / Responsive Design

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (JSON Web Token)

## 📂 Project Structure

```
mern-blog/
│
├── backend/        # Node.js + Express API
├── frontend/       # React frontend
├── database/       # Database export / seed files
├── img/            # Project images
└── README.md
```

## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/mern-blog.git
```

### 2️⃣ Install dependencies

Backend:

```
cd backend
npm install
```

Frontend:

```
cd frontend
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the **backend** folder and add:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Run the application

Backend:

```
npm start
```

Frontend:

```
npm run dev
```

## 📱 Responsive Design

The application is fully responsive and works smoothly on **mobile, tablet, and desktop devices**.

## 📌 Future Improvements

* Image upload for blogs
* Blog categories
* Search functionality
* Pagination

## 📜 License

This project is open source and available for learning and development purposes.
