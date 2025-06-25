# 💰 Expense Tracker (Full-Stack Application)

This is a full-stack expense tracking web application built as part of an assignment. It allows users to record, edit, delete, and visualize their income and expenses in a user-friendly dashboard.

---

## 📑 Table of Contents
- [About the Project](#about-the-project)
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Instructions](#project-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Data Visualizations](#data-visualizations)
- [Architecture & Flow](#architecture--flow)
- [License](#license)
- [Contact](#contact)

---

## 📖 About the Project
This is a full-stack **Expense Tracker** built using the **MERN (MongoDB, Express, React, Node.js)** stack.  
It allows users to **add, edit, delete**, and **visualize** their **income and expenses**, with real-time updates and interactive charts.  
Designed to help users manage their finances with clarity and simplicity.

---

## 🎥 Demo
Live Demo Link (Coming soon):  

---

## ✨ Features
- ✅ Add, edit, delete **Income** and **Expenses**
- ✅ View insights with **Bar**, **Line**, and **Donut Charts**
- ✅ Responsive **Dashboard** showing:
  - Total Balance
  - Total Income
  - Total Expenses
  - Last 60 Days Income (Donut Chart)
  - Last 60 Days Expenses (Line Chart)
- ✅ Filter by month
- ✅ CSV Export for Expenses
- ✅ Clean UI with Sidebar navigation
- 🛡️ Authentication (Planned as future enhancement)

---


## 🔧 Tech Stack

| Frontend     | Backend       | Database  |
|--------------|---------------|-----------|
| React        | Node.js       | MongoDB   |
| Tailwind CSS | Express.js    | Mongoose  |
| Chart.js     | CORS, Dotenv  | Atlas     |

---

# Project Instructions


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

```
### 2. Setup Backend

```bash

cd backend
npm install

👉 Create .env file

PORT=5000
MONGO_URI=<your-mongodb-connection-string>

Then run the server:
npm start
The backend will run on: http://localhost:5000

```
### 3. Setup Frontend

```bash

cd ../frontend
npm install

👉 Create .env file

REACT_APP_API_BASE_URL=http://localhost:5000

Then start the React app:
npm start
The frontend will run on: http://localhost:3000

```
### 🚀 Usage
- Add income or expense records using the form modal.

- View dynamic charts and summary stats.

- Edit or delete records anytime.

- Filter data by month or export to CSV (expenses).

- Navigate between Dashboard, Income, and Expense views via sidebar.

---

## 🗂️ Project Structure
```
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

```
  
### 📊 Data Visualizations
- Dashboard:

 - Total Balance, Income, Expenses

 - Last 60 Days Income (Donut Chart)

 - Last 60 Days Expenses (Line Chart)

- Income Page:

 - Income list with chart

- Expense Page:

 - Expense list with download option and chart

---

### 🧱 Architecture & Flow
- Frontend sends HTTP requests to backend using Axios.

- Backend API handles CRUD operations (/expenses, /incomes) using Express.

- Data is stored in MongoDB, structured via Mongoose models.

- Charts update dynamically based on the latest income/expense data.

- Responsive and reusable components are used across the app.

---
## 📜 License
This project is licensed under the **MIT License**.

## 📞 Contact
- **Name**: Thornala Vishnu Vardhan Reddy
- **GitHub**: [@vishnuvardhanreddythornala](https://github.com/vishnuvardhanreddythornala)
- **Email**: [vishnuvardhanreddythornala@gmail.com]

