# Food Rescue Network - API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Authentication Routes

### Register User

**POST** `/auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "user_id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### Login

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

---

## Donors Routes

### Get All Donors

**GET** `/donors`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
[
  {
    "donor_id": 1,
    "business_name": "Pizza Palace",
    "business_type": "Restaurant",
    "address": "123 Main St, Boston, MA",
    "contact_person": "John Smith",
    "email": "john@pizzapalace.com",
    "phone": "617-555-0101",
    "operating_hours": "11AM-10PM"
  }
]
```

### Get Donor by ID

**GET** `/donors/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "donor_id": 1,
  "business_name": "Pizza Palace",
  "business_type": "Restaurant",
  "address": "123 Main St, Boston, MA",
  "contact_person": "John Smith",
  "email": "john@pizzapalace.com",
  "phone": "617-555-0101",
  "operating_hours": "11AM-10PM"
}
```

### Create Donor

**POST** `/donors`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "business_name": "New Restaurant",
  "business_type": "Restaurant",
  "address": "456 Oak Ave, Boston, MA",
  "contact_person": "Jane Doe",
  "email": "jane@newrestaurant.com",
  "phone": "617-555-0102",
  "operating_hours": "9AM-9PM"
}
```

**Response:**

```json
{
  "donor_id": 11,
  "business_name": "New Restaurant",
  ...
}
```

### Update Donor

**PUT** `/donors/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "business_name": "Updated Restaurant",
  "business_type": "Restaurant",
  "address": "456 Oak Ave, Boston, MA",
  "contact_person": "Jane Doe",
  "email": "jane@newrestaurant.com",
  "phone": "617-555-0102",
  "operating_hours": "9AM-10PM"
}
```

**Response:**

```json
{
  "donor_id": 1,
  "business_name": "Updated Restaurant",
  ...
}
```

### Delete Donor

**DELETE** `/donors/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "message": "Donor deleted successfully"
}
```

---

## Volunteers Routes

### Get All Volunteers

**GET** `/volunteers`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
[
  {
    "volunteer_id": 1,
    "first_name": "James",
    "last_name": "Anderson",
    "email": "james.anderson@email.com",
    "phone": "617-555-0201",
    "vehicle_type": "SUV",
    "availability": "Weekdays 5PM-8PM",
    "total_hours": 12.5
  }
]
```

### Create Volunteer

**POST** `/volunteers`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "first_name": "New",
  "last_name": "Volunteer",
  "email": "new@volunteer.com",
  "phone": "617-555-0999",
  "vehicle_type": "Sedan",
  "availability": "Weekends"
}
```

### Update Volunteer

**PUT** `/volunteers/:id`

### Delete Volunteer

**DELETE** `/volunteers/:id`

---

## Donations Routes

### Get All Donations

**GET** `/donations`

**Headers:** `Authorization: Bearer <token>`

### Get Donation Statistics

**GET** `/donations/stats`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "total_donations": 15,
  "total_pounds": 451.5,
  "available_donations": 11,
  "claimed_donations": 3,
  "completed_donations": 1
}
```

### Create Donation

**POST** `/donations`

### Update Donation

**PUT** `/donations/:id`

### Delete Donation

**DELETE** `/donations/:id`

---

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "error": "No token provided"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

## Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **404** - Not Found
- **500** - Internal Server Error
