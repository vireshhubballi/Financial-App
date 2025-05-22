
# 💰 Financial Advisor App

A full-stack intelligent personal finance advisor that helps users manage their finances, track budgets, set financial goals, make smart investments, and get AI-powered recommendations.

---

## 🚀 Features

- 🧾 Financial Overview Dashboard
- 💳 Transaction Management
- 📊 Budget Planning with Categories
- 🎯 Goal Setting & Tracking
- 📈 Investment Tracking
- 🤖 AI-powered Predictions & Recommendations
- 📑 Reports & Insights
- ⚙️ User Settings (2FA, theme, preferences)
- 🔐 Secure JWT-based Authentication

---

## 🛠️ Tech Stack

### 🧠 Backend (Spring Boot)
- Spring Boot 3.4
- Spring Security + JWT
- REST APIs
- JPA + H2/MySQL
- ML Integration via Python/Flask

### 🌐 Frontend (React)
- React JS with Vite
- Axios with JWT Interceptors
- Chart Libraries for Visualization
- React Context API for Auth

---

## 📂 Folder Structure

```
/backend
  └── src/main/java/com/yourapp
      ├── controller
      ├── model
      ├── repository
      ├── service
      └── security
/frontend
  └── src
      ├── components
      ├── pages
      ├── context
      └── services
```

---

## 🧪 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/vireshhubballi/financial-advisor-app.git
cd financial-advisor-app
```

### 2. Run Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

> 📍 React runs on: `http://localhost:5173`  
> 📍 Spring Boot runs on: `http://localhost:8080`

---

## 🔐 API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Budget
- `GET /api/budget`
- `PUT /api/budget`

### Goals, Investments, ML, etc.
- `/api/goals`, `/api/investments`, `/api/ml/predict`

---

## 📌 Future Enhancements

- Notifications & Reminders
- Expense Categorization via AI
- Multi-user Accounts
- Export as PDF/Excel
- Chatbot Integration

---

## 🧑‍💻 Author

**Viresh Hubballi**  
Final Year CSE Student
Email: vireshhubballi909@gmail.com  
LinkedIn: [linkedin.com/in/vireshhuballi](https://www.linkedin.com/in/viresh-hubballi)

---

## 📄 License

MIT License. Feel free to use and contribute!
