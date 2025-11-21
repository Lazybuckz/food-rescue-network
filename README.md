# Food Rescue Network

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13%2B-blue)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)

**CS 665 Database Design Project - Community Food Rescue Application**

A full-stack web application that connects food donors, volunteer drivers, and recipient organizations to combat food waste and food insecurity.

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## Project Description

The Food Rescue Network is a comprehensive database-driven application designed to streamline the process of rescuing surplus food from donors and delivering it to organizations serving those in need. The system manages the complete lifecycle of food donations, from listing to delivery, while maintaining detailed records of all participants and transactions.

### Problem Statement

- **40% of food** in the United States goes to waste
- **1 in 8 Americans** struggle with food insecurity
- Lack of coordination between food donors and recipients

### Solution

A centralized platform that:

- Connects food donors (restaurants, grocery stores, bakeries) with recipient organizations
- Coordinates volunteer drivers for food pickup and delivery
- Tracks donation quantities, timing, and delivery logistics
- Provides real-time statistics and insights through data visualization

---

## Features

### User Authentication

- Secure user registration and login
- JWT token-based authentication
- Password encryption using bcrypt
- Role-based access control

### Dashboard

- Real-time statistics on donors, volunteers, and donations
- Interactive data visualization with charts
  - Pie chart showing donation status distribution
  - Bar chart displaying recent donations by weight
- Summary cards with key metrics

### Donor Management (CRUD)

- **Create**: Register new food donor businesses
- **Read**: View complete list of all donors with contact information
- **Update**: Edit donor details and operating hours
- **Delete**: Remove donors from the system
- Search and filter functionality

### Volunteer Management (CRUD)

- **Create**: Add new volunteer drivers
- **Read**: View volunteer roster with availability
- **Update**: Modify volunteer information and vehicle details
- **Delete**: Remove volunteers from the system
- Track total volunteer hours

### Food Donation Tracking

- List available food donations with details:
  - Food type and quantity (in pounds)
  - Allergen information
  - Pickup time windows
  - Donation status (available, claimed, completed)
- Real-time status updates
- Historical donation records

### Delivery Coordination

- Link donations with volunteers and recipients
- Track pickup and delivery times
- Record miles driven for each delivery
- Store delivery notes and feedback

---

## Technology Stack

### Backend

| Technology     | Purpose                                  |
| -------------- | ---------------------------------------- |
| **Node.js**    | JavaScript runtime environment           |
| **Express.js** | Web application framework                |
| **PostgreSQL** | Relational database management system    |
| **JWT**        | JSON Web Tokens for authentication       |
| **bcryptjs**   | Password hashing and encryption          |
| **pg**         | PostgreSQL client for Node.js            |
| **cors**       | Cross-Origin Resource Sharing middleware |
| **dotenv**     | Environment variable management          |

### Frontend

| Technology            | Purpose                            |
| --------------------- | ---------------------------------- |
| **React.js**          | JavaScript library for building UI |
| **Material-UI (MUI)** | React component library            |
| **Recharts**          | Composable charting library        |
| **Axios**             | HTTP client for API requests       |
| **React Router**      | Declarative routing for React      |

### Database

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| **PostgreSQL 17** | Primary database         |
| **pgAdmin 4**     | Database management tool |

### Development Tools

| Technology  | Purpose                         |
| ----------- | ------------------------------- |
| **Git**     | Version control                 |
| **GitHub**  | Code repository hosting         |
| **npm**     | Package management              |
| **Nodemon** | Auto-restart during development |

---

## Database Schema

The application uses **6 normalized tables** in **Third Normal Form (3NF)**:

### 1. **Donors** (Food Donor Businesses)

```sql
donor_id (PK), business_name, business_type, address,
contact_person, email, phone, operating_hours, created_at
```

### 2. **Volunteers** (Volunteer Drivers)

```sql
volunteer_id (PK), first_name, last_name, email, phone,
vehicle_type, availability, total_hours, created_at
```

### 3. **Recipients** (Recipient Organizations)

```sql
recipient_id (PK), organization_name, org_type, address,
capacity_lbs, contact_person, email, phone, created_at
```

### 4. **FoodDonations** (Food Donation Listings)

```sql
donation_id (PK), donor_id (FK), food_type, quantity_lbs,
allergen_info, pickup_start, pickup_end, status, created_at
```

### 5. **Deliveries** (Completed Deliveries)

```sql
delivery_id (PK), donation_id (FK), volunteer_id (FK),
recipient_id (FK), pickup_time, delivery_time,
miles_driven, notes, created_at
```

### 6. **Users** (Authentication)

```sql
user_id (PK), email, password, first_name, last_name,
user_type, created_at
```

**Relationships:**

- `FoodDonations.donor_id` → `Donors.donor_id`
- `Deliveries.donation_id` → `FoodDonations.donation_id`
- `Deliveries.volunteer_id` → `Volunteers.volunteer_id`
- `Deliveries.recipient_id` → `Recipients.recipient_id`

---

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **PostgreSQL** (v13 or higher)
- **Git**

### Step 1: Clone Repository

```bash
git clone https://github.com/lazybuckz/food-rescue-network.git
cd food-rescue-network
```

### Step 2: Database Setup

```bash
# Create database
psql -U postgres
CREATE DATABASE food_rescue_network;
\c food_rescue_network

# Exit psql
\q

# Run schema and seed data
psql -U postgres -d food_rescue_network -f database_setup.sql
```

### Step 3: Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DB_USER=postgres
# DB_HOST=localhost
# DB_NAME=food_rescue_network
# DB_PASSWORD=your_password
# DB_PORT=5432
# JWT_SECRET=your_secret_key
# PORT=5000
```

### Step 4: Frontend Setup

```bash
cd ../frontend
npm install
```

---

## Usage

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend runs on **http://localhost:5000**

### Start Frontend Application

```bash
cd frontend
npm start
```

Frontend runs on **http://localhost:3000**

### Default Test Account

```
Email: ericobadjere033@gmail.com
Password: (your password)
```

---

## API Documentation

Complete API documentation is available in [`backend/API_DOCUMENTATION.md`](backend/API_DOCUMENTATION.md)

### Quick Reference

| Method | Endpoint               | Description        | Auth Required |
| ------ | ---------------------- | ------------------ | ------------- |
| POST   | `/api/auth/register`   | Register new user  | NO            |
| POST   | `/api/auth/login`      | User login         | NO            |
| GET    | `/api/donors`          | Get all donors     | YES           |
| POST   | `/api/donors`          | Create donor       | YES           |
| PUT    | `/api/donors/:id`      | Update donor       | YES           |
| DELETE | `/api/donors/:id`      | Delete donor       | YES           |
| GET    | `/api/volunteers`      | Get all volunteers | YES           |
| POST   | `/api/volunteers`      | Create volunteer   | YES           |
| GET    | `/api/donations`       | Get all donations  | YES           |
| GET    | `/api/donations/stats` | Get statistics     | YES           |

---

## Testing

See [`TESTING.md`](TESTING.md) for comprehensive testing guide.

### Quick Test

```bash
# Test backend is running
curl http://localhost:5000/api/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

---

## Deployment

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for complete deployment guide.

### Quick Deploy to Heroku

```bash
# Backend
heroku create food-rescue-api
heroku addons:create heroku-postgresql:hobby-dev
git subtree push --prefix backend heroku main

# Frontend
npm run build
# Deploy build/ folder to Netlify, Render or Vercel
```

---

## Project Statistics

- **Total Lines of Code:** ~3,500
- **Backend Routes:** 15+
- **Frontend Components:** 10+
- **Database Tables:** 6
- **Total Sample Data:** 60+ rows

---

## Contributing

This is an academic project for CS 665. Contributions are not currently accepted.

---

## Author

**Eric OBADJERE**  
Wichita State University  
CS 665 - Introduction To Database System  
Fall 2025

---

## Contact

- **Email:** ericobadjere033@gmail.com
- **GitHub:** [@lazybuckz](https://github.com/lazybuckz)
- **Repository:** [food-rescue-network](https://github.com/lazybuckz/food-rescue-network)

---

## License

This project is created for educational purposes as part of CS 665 coursework.

---

## Acknowledgments

- **Professor:** Professor Huabo Lu
- **Institution:** Wichita State University
- **Course:** CS 665 - Introduction To Database System
- **Inspiration:** Addressing food waste and food insecurity through technology

---

## Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Donors Management

![Donors](./screenshots/donors.png)

### Volunteers Management

![Volunteers](./screenshots/volunteers.png)

---

## Future Enhancements

- [ ] Mobile application (React Native)
- [ ] SMS notifications for volunteers
- [ ] Route optimization for deliveries
- [ ] Automated matching algorithm
- [ ] Reporting and analytics dashboard
- [ ] Multi-language support
- [ ] Integration with mapping services (Google Maps)
- [ ] Email notifications
- [ ] Admin dashboard for system management
- [ ] Public-facing website for donor registration

---

## Changelog

### Version 1.0.0 (November 2025)

- Initial release
- Complete CRUD operations for all entities
- User authentication with JWT
- Data visualization dashboard
- Responsive Material-UI design

---

**If you found this project helpful, please give it a star on GitHub!**

---
