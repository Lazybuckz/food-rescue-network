# Testing Guide - Food Rescue Network

## Manual Testing Checklist

### Authentication

- [ ] User can register with valid credentials
- [ ] Registration fails with duplicate email
- [ ] User can login with correct credentials
- [ ] Login fails with incorrect credentials
- [ ] JWT token is stored and used correctly
- [ ] Protected routes require authentication

### Donors CRUD

- [ ] Can view list of all donors
- [ ] Can create new donor with valid data
- [ ] Form validation works (required fields)
- [ ] Can edit existing donor
- [ ] Changes persist after edit
- [ ] Can delete donor
- [ ] Deletion confirmation works

### Volunteers CRUD

- [ ] Can view list of all volunteers
- [ ] Can create new volunteer
- [ ] Can edit volunteer details
- [ ] Can delete volunteer
- [ ] Total hours display correctly

### Dashboard

- [ ] Statistics cards show correct counts
- [ ] Pie chart displays donation status
- [ ] Bar chart shows recent donations
- [ ] Charts update when data changes

### Navigation

- [ ] Can navigate between all pages
- [ ] Logout button works
- [ ] Redirects to login when not authenticated
- [ ] Navigation menu is visible

---

## API Testing with Postman/curl

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Donors (with token)

```bash
curl -X GET http://localhost:5000/api/donors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Donor

```bash
curl -X POST http://localhost:5000/api/donors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "Test Restaurant",
    "business_type": "Restaurant",
    "email": "test@restaurant.com",
    "phone": "617-555-0100"
  }'
```

---

## Database Testing

### Verify Data Integrity

```sql
-- Check all tables have data
SELECT 'donors' as table_name, COUNT(*) as row_count FROM donors
UNION ALL
SELECT 'volunteers', COUNT(*) FROM volunteers
UNION ALL
SELECT 'fooddonations', COUNT(*) FROM fooddonations
UNION ALL
SELECT 'recipients', COUNT(*) FROM recipients
UNION ALL
SELECT 'deliveries', COUNT(*) FROM deliveries
UNION ALL
SELECT 'users', COUNT(*) FROM users;
```

### Verify Foreign Keys

```sql
-- Check deliveries reference valid donations
SELECT d.delivery_id FROM deliveries d
LEFT JOIN fooddonations f ON d.donation_id = f.donation_id
WHERE f.donation_id IS NULL;
```

### Test Constraints

```sql
-- Try to insert duplicate email (should fail)
INSERT INTO donors (business_name, email)
VALUES ('Test', 'john@pizzapalace.com');
```

---

## Performance Testing

### Load Time

- Dashboard should load < 2 seconds
- List pages should load < 1 second
- Forms should submit < 1 second

### Database Queries

```sql
-- Check slow queries
EXPLAIN ANALYZE SELECT * FROM donors;
```

---

## Security Testing

### SQL Injection

- Try entering `' OR '1'='1` in login form
- Should be prevented by parameterized queries

### XSS Protection

- Try entering `<script>alert('XSS')</script>` in forms
- Should be sanitized

### Authentication

- Try accessing protected routes without token
- Should return 401 Unauthorized

---

## Browser Compatibility

Test in:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Mobile Responsiveness

Test on:

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## Known Issues

None currently identified.

---

## Future Testing Needs

- Unit tests for API endpoints
- Integration tests for database operations
- E2E tests with Cypress
- Automated testing pipeline
