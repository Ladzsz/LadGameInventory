# GameInventory

A small **game inventory management** app built with **Node.js, Express, and PostgreSQL**.  
Users can **CRUD games** by **category/genre** (Action, Platformer, Shooter, Horror, RPG).

---

## 🛠️ Features

- User authentication (optional, can be added later)  
- Add, view, update, and delete games  
- Organize games by **genre/category**  
- Simple static frontend with **HTML/CSS** (`UI/pages/`)  
- Backend powered by **Express.js**  
- Database handled with **PostgreSQL**  

---

## ⚡ Tech Stack

- Node.js  
- Express.js  
- PostgreSQL  
- dotenv for environment variables  
- pg for database connection  
- CORS and Morgan for middleware/logging  

---

## 📂 Project Structure

project/
│
├── app.js # Express app configuration
├── server.js # Entry point
├── UI/
│ └── pages/ # HTML pages
├── routes/ # API routes
|-- controllers/ # API controllers
|-- model/ # API database logic
├── .env # Environment variables
└── package.json

---

## 🚀 Installation

1. Clone the repo:

```bash
git clone <your-repo-url>
cd GameInventory

2. install dependencies

```bash
npm install