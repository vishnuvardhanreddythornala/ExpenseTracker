# 💰 Expense Tracker (Full-Stack Application)

This is a full-stack expense tracking web application built as part of an assignment. It allows users to record, edit, delete, and visualize their income and expenses in a user-friendly dashboard.

---

## 🧾 Features

- ✅ Add, edit, delete **income** and **expenses**
- ✅ Visualize data with **bar, line, and donut charts**
- ✅ **Dashboard** with total balance, income, expenses
- ✅ Responsive, modern UI using **React + Tailwind CSS**
- ✅ RESTful backend with **Node.js**, **Express.js**
- ✅ Data storage using **MongoDB**
- ✅ Optional user authentication (planned for future)

---

## 🔧 Tech Stack

| Frontend     | Backend       | Database  |
|--------------|---------------|-----------|
| React        | Node.js       | MongoDB   |
| Tailwind CSS | Express.js    | Mongoose  |
| Chart.js     | CORS, Dotenv  | Atlas     |

---

## 🗂️ Folder Structure

ExpenseTracker/
│
├── backend/ # Express API (Node.js)
│ ├── controllers/ # Logic for expenses & income
│ ├── models/ # Mongoose models
│ ├── routes/ # API route definitions
│ ├── config/ # MongoDB config
│ ├── .env # Environment variables
│ └── server.js # Entry point for backend
│
├── frontend/ # React App (UI)
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Income, Expense, Dashboard pages
│ │ └── App.js # Main router and layout
│ ├── .env # API base URL
│ └── tailwind.config.js # Tailwind CSS config

# Project instructions


---

## 🚀 How to Run the Project

### ✅ Prerequisites

- Node.js (v16 or later)
- MongoDB (or MongoDB Atlas)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/vishnuvardhanreddythornala/ExpenseTracker.git
cd ExpenseTracker

### 2. Setup Backend
bash
Copy
Edit
cd backend
npm install
👉 Create .env file
ini
Copy
Edit
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
Then run the server:

bash
Copy
Edit
npm start
The backend will run on: http://localhost:5000

3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
👉 Create .env file
ini
Copy
Edit
REACT_APP_API_BASE_URL=http://localhost:5000
Then start the React app:

bash
Copy
Edit
npm start
The frontend will run on: http://localhost:3000

📊 Data Visualizations
Dashboard:

Total Balance, Income, Expenses

Last 60 Days Income (Donut Chart)

Last 60 Days Expenses (Line Chart)

Income Page:

Income list with chart

Expense Page:

Expense list with download option and chart

🧱 Architecture & Flow
Frontend sends HTTP requests to backend using Axios.

Backend API handles CRUD operations (/expenses, /incomes) using Express.

Data is stored in MongoDB, structured via Mongoose models.

Charts update dynamically based on the latest income/expense data.

Responsive and reusable components are used across the app.















