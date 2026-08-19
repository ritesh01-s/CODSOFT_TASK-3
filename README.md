# 🚌 SAFAR — Cloud-Based Bus Ticket Reservation System

**SAFAR** is a full-stack **Bus Ticket Reservation System** developed as part of the **CodSoft Cloud Computing Internship — Task 3**.

The application allows users to search for available bus journeys, select seats, enter passenger information, reserve tickets, and manage their bookings through a user-friendly web interface.

> **Current status:** The application has been developed and tested locally. Cloud deployment is currently in progress.

## ✨ Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Search available bus journeys
* View bus and journey details
* Select available seats
* Enter passenger details
* Reserve bus tickets
* View booking confirmation
* View and manage previous bookings
* User profile management

### 🔐 Security

* JWT authentication
* Protected API routes
* Authentication middleware
* Admin authorization middleware
* Environment variables for sensitive configuration
* Secure separation of frontend and backend services

### ⚙️ Backend

* RESTful API built with Node.js and Express.js
* MongoDB database integration using Mongoose
* User authentication and authorization
* Bus and journey management
* Seat reservation and booking management
* Booking-related API endpoints

### 🎨 Frontend

* React.js
* Vite
* Responsive user interface
* React Router
* API integration with the Express backend
* Seat selection interface
* Booking and profile interfaces

## 🛠️ Technology Stack

| Layer           | Technology   |
| --------------- | ------------ |
| Frontend        | React.js     |
| Build Tool      | Vite         |
| Backend         | Node.js      |
| API Framework   | Express.js   |
| Database        | MongoDB      |
| ODM             | Mongoose     |
| Authentication  | JWT          |
| Styling         | CSS          |
| Version Control | Git & GitHub |

## 📁 Project Structure

```text
SAFAR-MERN/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd SAFAR-MERN
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/safarDB
JWT_SECRET=your_jwt_secret
```

> Never commit `.env` files or database credentials to GitHub.

### 5. Start the backend

From the `server` directory:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 6. Start the frontend

From the `client` directory:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## ☁️ Cloud Deployment

The project is being prepared for cloud deployment using a scalable architecture:

```text
                    ┌─────────────────────┐
                    │       User          │
                    │     Web Browser     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      Vercel         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   MongoDB Atlas     │
                    │    Cloud Database   │
                    └─────────────────────┘
```

### Planned Cloud Components

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **Source Code:** GitHub

Cloud deployment will allow the application to be accessed over the internet without depending on a locally running server or database.

## 📈 Scalability

The application is designed with separate frontend, backend, and database layers. This architecture allows the individual components to be deployed and scaled independently.

The planned cloud deployment provides a foundation for supporting increased traffic through:

* Cloud-hosted frontend infrastructure
* Independently deployed backend API
* Managed cloud database
* Stateless JWT-based authentication
* Separation of application and database services

## 🧪 Testing

The following functionality is being tested during development and deployment:

* User registration
* User login
* Authentication
* Bus search
* Journey selection
* Seat selection
* Passenger information
* Ticket reservation
* Booking confirmation
* My Bookings
* User profile
* API communication
* Cloud database connectivity
* Production deployment

## 🎓 Internship Task

This project was developed for:

**CodSoft Cloud Computing Internship**

**Task 3 — Cloud-Based Bus Ticket Reservation System**

### Task Objective

> Develop a cloud-hosted application for booking bus tickets online. Allow users to search routes, reserve seats, and manage ticket bookings. Store booking information securely in a cloud database. Design the application to support high user traffic using scalable cloud infrastructure. Deploy and test the system to provide a reliable and user-friendly booking experience.

## 🔮 Future Improvements

* Online payment integration
* Email/SMS booking notifications
* Admin dashboard
* Real-time seat availability
* Advanced bus and route filtering
* Booking cancellation and refund management
* Cloud monitoring and logging
* Automated CI/CD deployment
* Additional scalability and performance optimization

## 👨‍💻 Project Status

**Development:** ✅ Completed
**Local Testing:** ✅ Completed
**GitHub Repository:** 🔄 In Progress
**Cloud Database:** 🔄 Planned
**Backend Deployment:** 🔄 Planned
**Frontend Deployment:** 🔄 Planned
**Production Testing:** 🔄 Planned

---

**SAFAR — Making Bus Ticket Booking Simple, Secure, and Convenient.** 🚌
