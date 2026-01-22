# GameInventory

A small **game inventory management** app built with **Node.js, Express, and PostgreSQL**.  
Users can **CRUD games** by **category/genre** (Action, Platformer, Shooter, Horror, RPG).

---

## 🛠️ Features

- User authentication (optional, can be added later)  
- Add, view, update, and delete games  
- Organize games by **genre/category**  
- Frontend powered by REACT jsx 
- Backend powered by **Express.js**  
- Database handled with **PostgreSQL**  

---

## ⚡ Tech Stack

- Node.js
- REACT
- Express.js  
- PostgreSQL  
- dotenv for environment variables  
- pg for database connection  
- CORS and Morgan for middleware/logging  

---

## 📂 Project Structure

project/
│
├── backend/                  # Express backend
│   ├── app.js                # Express app configuration
│   ├── server.js             # Entry point for the backend
│   ├── routes/               # API routes
│   ├── controllers/          # Route controllers / business logic
│   ├── model/                # Database models / queries
│   ├── .env                  # Environment variables
│   └── package.json          # Backend dependencies
│   ├── README.md             #backend documentation
│
├── frontend/                 # React frontend
│   ├── package.json          # Frontend dependencies
│   ├── README.md             #frontend documentation
│   ├── UI/                   # Main UI folder
│      └── src/               # React source code
│         ├── App.jsx         # main app file
│         ├── components/      # components
│         ├── assets/         #styles and images
│
└── README.md                 # Project documentation


---

## 🚀 Installation

1. Clone the repo:

```bash
git clone <your-repo-url>
cd GameInventory

2. install dependencies

```bash
npm install
