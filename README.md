# Food Rescue Network

# Food Rescue Network

CS 665 Database Design Project - Community Food Rescue Network Application

## Project Description

A full-stack web application that connects food donors, volunteer drivers, and recipient organizations to combat food waste and food insecurity.

## Technology Stack

### Backend

- Node.js + Express.js
- PostgreSQL (Database)
- JWT Authentication
- bcryptjs (Password hashing)

### Frontend

- React.js
- Material-UI (UI Components)
- Recharts (Data Visualization)
- Axios (HTTP Client)

## Database Schema

5 normalized tables (3NF):

1. **Donors** - Food donor businesses
2. **Volunteers** - Volunteer drivers
3. **Recipients** - Recipient organizations
4. **FoodDonations** - Food donation listings
5. **Deliveries** - Completed deliveries
6. **Users** - Authentication

## Features

- ✅ User Authentication (Register/Login)
- ✅ Dashboard with data visualization
- ✅ Full CRUD operations for all entities
- ✅ Real-time statistics
- ✅ Responsive Material-UI design

## Installation

### Backend Setup

```bash
cd backend
npm install
# Create .env file with database credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Author

Eric - Wichita State University

## Course

CS 665 - Database Design
