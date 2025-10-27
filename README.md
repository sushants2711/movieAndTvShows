# Favorite Movies & TV Shows Web Application

A **Favorite Movies & TV Shows Web Application** that allows users to efficiently browse, manage, and keep track of their favorite movies and TV shows. The platform includes user authentication, protected routes, and ensures secure access. Users can easily view, add, update, and delete their favorite content while enjoying a seamless and interactive experience.

---

🔗 **Live Demo:**
[MovieSpot](https://movie-tv-show-frontend-sushant.vercel.app/)

---

🔗 **Backend Deployment Link:**
[MovieSpot](https://backend-movie-and-tv-shows.onrender.com)

---

🔗 **Github Link:**
[MovieSpot](https://github.com/sushants2711/movieAndTvShows)

---

## Login (Demo Credentials)

> **Guest**
> Username: `test@gmail.com`
> Password: `oppo1234`

---

## Features

- **User Authentication** — Login, Signup, and Logout functionality for secure access.
- **Add New Movie/TV Show** — Add a new movie or TV show with details like title, type, director, budget, location, duration, and year.
- **View All Movies/TV Shows** — Browse all added content in a clean and structured interface.
- **Search & Filter** — Easily search or filter movies and TV shows by title, type, director, or year.
- **Protected Routes** — Secure routes accessible only to authenticated users.
- **Responsive UI** — Mobile-friendly and desktop-ready design built using Tailwind CSS.

---

## ⚙️ Installation & Setup

Follow the steps below to clone and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sushants2711/movieAndTvShows
2️⃣ Navigate into the Project Folder
bash

cd folder name || Open a integrated terminal of VsCode
3️⃣ Install Dependencies

For Backend:
cd backend
npm install

For Frontend:
cd ../frontend
npm install

4️⃣ Configure Environment Variables

Create a .env file in the backend folder:

PORT=4700
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

```

---

## 🛠️ Tech Stack

### **Frontend**

- ⚛️ React.js
- 💅 Tailwind Css
- 🌐 HTML

### **Backend**

- 🧩 Node.js
- 🚀 Express.js

### **Database**

- 🍃 MongoDB

---

## Backend Tools & Technologies

The backend of this project is built using Node.js and several modern libraries to provide a secure, scalable, and maintainable API.

- **Node.js** – JavaScript runtime for building server-side applications.
- **Express.js** – Web framework for building APIs and handling routes.
- **MongoDB & Mongoose** – Database and ODM for storing and managing data.
- **bcryptjs** – Password hashing for authentication security.
- **jsonwebtoken (JWT)** – User authentication and authorization.
- **Joi** – Data validation and schema enforcement.
- **dotenv** – Environment variable management.
- **cors** – Handling Cross-Origin Resource Sharing.
- **body-parser** – Parsing incoming request bodies.
- **cookie-parser** – Parsing cookies from HTTP requests.
- **nodemon** – Automatic server restart during development.

---

## Frontend Tools & Technologies

This project is built using modern React.js tools and technologies to create a responsive, maintainable, and feature-rich frontend.

- **React.js** – JavaScript library for building user interfaces.
- **React Router DOM** – Client-side routing.
- **React Helmet** – Manage document head and metadata dynamically.
- **React Toastify** – Toast notifications.
- **Tailwind CSS** – Utility-first CSS framework for responsive design.
- **Fetch API** – HTTP requests handling.
- **React Hooks (useState, useEffect, useContext)** – State management and lifecycle methods.
- **Context API** – Global state management.
- **Vite / Create React App** – Project build and development tooling.
- **React DevTools** – Debugging and component inspection.

## 🧩 Backend API Endpoints

1. GET /api/v1/movies/all - Fetch all projects/tasks ✅

```
{
  "success": true,
  "message": "Movie Data fetch successfully",
  "data": [
   {
            "_id": "68fe4bedd18af24528780a4b",
            "title": "Inception",
            "type": "Movie",
            "director": "Christopher Nolan",
            "budget": 160000000,
            "location": "Los Angeles",
            "duration": 148,
            "year": "2010-07-16T00:00:00.000Z",
            "createdAt": "2025-10-26T16:27:25.546Z",
            "updatedAt": "2025-10-26T16:27:25.546Z",
            "__v": 0
        },
        {
            "_id": "68fe4c03d18af24528780a4e",
            "title": "The Dark Knight",
            "type": "Movie",
            "director": "Christopher Nolan",
            "budget": 185000000,
            "location": "Chicago",
            "duration": 152,
            "year": "2008-07-18T00:00:00.000Z",
            "createdAt": "2025-10-26T16:27:47.941Z",
            "updatedAt": "2025-10-26T16:27:47.941Z",
            "__v": 0
        },
        {
            "_id": "68fe4c0ed18af24528780a51",
            "title": "Interstellar",
            "type": "Movie",
            "director": "Christopher Nolan",
            "budget": 165000000,
            "location": "Iceland",
            "duration": 169,
            "year": "2014-11-07T00:00:00.000Z",
            "createdAt": "2025-10-26T16:27:58.549Z",
            "updatedAt": "2025-10-26T16:27:58.549Z",
            "__v": 0
        },
  ],
  "pagination": {
        "currentPage": 1,
        "totalPages": 2,
        "totalMovies": 2
    }
}

```

2. POST /api/v1/movie/add - Add a new project/task ✅

```
{
  "success": true,
  "message": "Movie added Successfully",
  "data": [
   {
            "_id": "68fe4bedd18af24528780a4b",
            "title": "Inception",
            "type": "Movie",
            "director": "Christopher Nolan",
            "budget": 160000000,
            "location": "Los Angeles",
            "duration": 148,
            "year": "2010-07-16T00:00:00.000Z",
            "createdAt": "2025-10-26T16:27:25.546Z",
            "updatedAt": "2025-10-26T16:27:25.546Z",
            "__v": 0
        },
  ]
}
```

---

## Contact

For bugs or feature request, please reach out to sushants2711@gmail.com

[Linkedin](https://www.linkedin.com/in/sushant-kumar-singh-414782230)

[WhatsApp](https://wa.me/7903759760)
