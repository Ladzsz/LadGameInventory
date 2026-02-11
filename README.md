# GameInventory

A small game inventory management app built with **Node.js**, **Express**, **React**, and **PostgreSQL**.  
Users can **CRUD games by category/genre** (Action, Platformer, Shooter, Horror, RPG) and more.

---

## 🛠️ Features
- User authentication 
- Add, view, update, and delete games
- Organize games by genre/category
- Frontend powered by **React JSX**
- Backend powered by **Express.js**
- Database handled with **PostgreSQL**

---

## ⚡ Tech Stack
- **Node.js**
- **React**
- **Express.js**
- **PostgreSQL**
- **dotenv** for environment variables
- **pg** for database connection
- **CORS** and **Morgan** for middleware/logging

---

## 📂 Project Structure

project/
│
├── backend/ # Express backend
│ ├── app.js # Express app configuration
│ ├── server.js # Entry point for backend
│ ├── routes/ # API routes
│ ├── controllers/ # Route controllers / business logic
│ ├── model/ # Database models / queries
│ ├── .env # Environment variables
│ └── package.json # Backend dependencies
│ └── README.md # Backend documentation
│
├── frontend/ # React frontend
│ ├── package.json # Frontend dependencies
│ ├── UI/ # Main UI folder
│ │ └── pages/ # JSX pages/components
│ └── src/ # React source code
│ ├── App.jsx # Main React app component
│ ├── components/ # Header, Footer, Content, etc.
│ ├── assets/ # Styles, images
│ └── README.md # Frontend documentation
│
└── README.md # Root documentation

---

## 🚀 Installation

1. **Clone the repo**:

```
git clone <your-repo-url>
cd GameInventory

```

2. Install backend dependencies

 ```
cd backend
npm install

```
3. Install fronend dependencies

```
cd ../frontend/UI
npm install

```
4. Running the app (add this later when finished)


---   
## Credits

The error style used across this project was adapted from [AntiKippi](https://github.com/AntiKippi/errorpages). 
Many thanks for making it available under a free license!
