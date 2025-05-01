# 💼 Core Banking API

A secure and extensible RESTful API that powers digital banking operations — including user authentication, account management, and transaction handling.

---

## Features

-  User registration & login (JWT-based)
-  Account creation
-  Deposits, withdrawals, and internal transfers
-  Clean MVC architecture for scalability with class based services
-  Proper Logging features implemented with winston

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Prisma ORM with MySQL
- **Authentication:** JWT (stateless)
- **Others:** Dotenv, Bcrypt, Middleware, Logging

---

### 1. Clone the Repository

```bash
git clone https://github.com/Bensonate98/core-banking-system.git
cd core-banking-system
```

---

### 2. Install Dependencies

```bash
npm install
```

This installs all required Node.js packages listed in `package.json`.

---

### 3. Configure Environment Variables

Create a `.env` file in the project root then copy and paste the .env.example:

Update the values to match your local environment if they don't match.

---

### 4. Set Up the Database (Using XAMPP): You can use any other means you know

#### ✅ Step 1: Start MySQL Server in XAMPP

- Open XAMPP Control Panel
- Click **Start** next to **MySQL**
- Click **Start** next to **Apache**

#### ✅ Step 2: Create the Database via phpMyAdmin

- Open a browser and go to: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
- Click on **"New"** in the left sidebar
- Enter `core-bank` as the database name
- Click **"Create"**

#### ✅ Step 3: Apply Prisma Migrations

In your terminal, run:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This will apply the Prisma schema and generate necessary tables in your MySQL database.

#### ✅ Optional: View Your Database

```bash
npx prisma studio
```

This opens a browser UI to explore your database.

---

### 5. Start the Development Server

```bash
npm run dev
```

Your server should now be running the following in your terminal
```bash
Server running on  http://localhost:8080
```

---

## 📘 API Documentation

Access the full API documentation on Postman:

[🔗 View Postman Docs](https://documenter.getpostman.com/view/39968425/2sB2j4eqP2#8227fc65-f1ce-482d-b89d-e7412d44d3ba)

## 📘 Database Design

Access ERD here:

[🔗 View Database deign here ](https://dbdocs.io/bensonchristopher84/core-banking-system)


## Key Design Notes:
- I used soft deletion for accounts to preserve history.
- Transfers are wrapped in Prisma transactions for atomicity.
- I structured the code with scalability in mind, keeping business logic in service classes.
- If this were production, I’d also implement role-based access, request logging to a monitoring service, and stricter KYC validation. 
- I'll add unit tests later, I know it is very necessary

## 🤝 Contributing

1. Fork the repository
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a Pull Request

---

## Author

Built with ❤️ by [Benson Christopher Emuzo]  
[GitHub](https://github.com/bensonate98) • [LinkedIn](https://www.linkedin.com/in/christopher-benson-1a560b244/)


