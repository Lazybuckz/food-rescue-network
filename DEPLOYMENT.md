# Deployment Guide - Food Rescue Network

## Prerequisites

- Node.js 16+ and npm
- PostgreSQL 12+
- Git

---

## Database Setup

### 1. Create Database

```bash
psql -U postgres
CREATE DATABASE food_rescue_network;
\c food_rescue_network
```

### 2. Run Schema

```bash
psql -U postgres -d food_rescue_network -f database_setup.sql
```

---

## Backend Deployment

### 1. Navigate to Backend

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

### 4. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on http://localhost:5000

---

## Frontend Deployment

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

Edit `src/services/api.js` to point to your backend URL

### 4. Start Application

```bash
# Development
npm start

# Production Build
npm run build
```

Frontend runs on http://localhost:3000

---

## Production Deployment

### Option 1: Heroku

**Backend:**

```bash
heroku create food-rescue-api
heroku addons:create heroku-postgresql:hobby-dev
git subtree push --prefix backend heroku main
```

**Frontend:**

```bash
npm run build
# Deploy build folder to hosting service (Netlify, Vercel, etc.)
```

### Option 2: DigitalOcean

1. Create a droplet with Ubuntu 22.04
2. Install Node.js and PostgreSQL
3. Clone repository
4. Follow setup steps above
5. Use PM2 for process management:

```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

### Option 3: AWS

Use EC2 for backend, RDS for database, S3 + CloudFront for frontend

---

## Environment Variables for Production

**Backend:**

```env
DB_USER=production_user
DB_HOST=your-db-host.com
DB_NAME=food_rescue_network
DB_PASSWORD=strong_password
DB_PORT=5432
JWT_SECRET=long_random_string_min_32_chars
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend:**
Update API base URL in `src/services/api.js`

---

## Security Checklist

- [ ] Change JWT_SECRET to random string (32+ characters)
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL certificates
- [ ] Set secure CORS origins
- [ ] Use environment variables for all secrets
- [ ] Enable database connection pooling
- [ ] Set up rate limiting
- [ ] Enable request logging
- [ ] Configure firewall rules
- [ ] Regular backups of database

---

## Monitoring

### Logs

```bash
# Backend logs
pm2 logs

# Database logs
tail -f /var/log/postgresql/postgresql.log
```

### Health Check

```bash
curl http://localhost:5000/api/health
```

---

## Troubleshooting

### Database Connection Errors

- Verify PostgreSQL is running
- Check .env credentials
- Ensure database exists
- Check firewall rules

### Port Already in Use

```bash
# Find process using port
lsof -i :5000
# Kill process
kill -9 <PID>
```

### JWT Token Errors

- Verify JWT_SECRET matches between environments
- Check token expiration time
- Ensure proper Authorization header format

---

## Backup & Recovery

### Database Backup

```bash
pg_dump -U postgres food_rescue_network > backup.sql
```

### Database Restore

```bash
psql -U postgres food_rescue_network < backup.sql
```

---

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
```

### Database Migrations

```bash
# Create backup first
pg_dump -U postgres food_rescue_network > backup_before_migration.sql

# Run migration
psql -U postgres -d food_rescue_network -f migration.sql
```
