-- Database schema and sample data
-- CS 665 Project 1: Food Rescue Network Database
-- Student: Eric
-- Date: November 2025

-- Create Database
CREATE DATABASE food_rescue_network;

-- Connect to database
\c food_rescue_network;

-- Table 1: Donors
CREATE TABLE Donors (
    donor_id SERIAL PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    address VARCHAR(500),
    contact_person VARCHAR(200),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    operating_hours VARCHAR(200),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: FoodDonations
CREATE TABLE FoodDonations (
    donation_id SERIAL PRIMARY KEY,
    donor_id INTEGER NOT NULL REFERENCES Donors(donor_id),
    food_type VARCHAR(200) NOT NULL,
    quantity_lbs DECIMAL(10,2),
    allergen_info TEXT,
    pickup_start TIMESTAMP NOT NULL,
    pickup_end TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 3: Volunteers
CREATE TABLE Volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    vehicle_type VARCHAR(100),
    availability TEXT,
    total_hours DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 4: Recipients
CREATE TABLE Recipients (
    recipient_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    org_type VARCHAR(100),
    address VARCHAR(500),
    capacity_lbs DECIMAL(10,2),
    contact_person VARCHAR(200),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 5: Deliveries
CREATE TABLE Deliveries (
    delivery_id SERIAL PRIMARY KEY,
    donation_id INTEGER UNIQUE NOT NULL REFERENCES FoodDonations(donation_id),
    volunteer_id INTEGER NOT NULL REFERENCES Volunteers(volunteer_id),
    recipient_id INTEGER NOT NULL REFERENCES Recipients(recipient_id),
    pickup_time TIMESTAMP,
    delivery_time TIMESTAMP,
    miles_driven DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 6: Users (for authentication)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    user_type VARCHAR(50) DEFAULT 'volunteer',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data for Donors (10 rows)
INSERT INTO Donors (business_name, business_type, address, contact_person, email, phone, operating_hours) VALUES
('Pizza Palace', 'Restaurant', '123 Main St, Boston, MA', 'John Smith', 'john@pizzapalace.com', '617-555-0101', '11AM-10PM'),
('Fresh Mart Grocery', 'Grocery Store', '456 Oak Ave, Boston, MA', 'Sarah Johnson', 'sarah@freshmart.com', '617-555-0102', '7AM-9PM'),
('Whole Foods Market', 'Grocery Store', '789 Elm St, Cambridge, MA', 'Mike Davis', 'mike@wholefoodsmarket.com', '617-555-0103', '8AM-10PM'),
('Bella Italia', 'Restaurant', '321 Park Rd, Somerville, MA', 'Maria Garcia', 'maria@bellaitalia.com', '617-555-0104', '5PM-11PM'),
('Green Leaf Cafe', 'Cafe', '654 River St, Cambridge, MA', 'Tom Wilson', 'tom@greenleaf.com', '617-555-0105', '7AM-6PM'),
('City Bakery', 'Bakery', '987 Center St, Boston, MA', 'Lisa Brown', 'lisa@citybakery.com', '617-555-0106', '6AM-8PM'),
('Taco Fiesta', 'Restaurant', '147 Broadway, Somerville, MA', 'Carlos Rodriguez', 'carlos@tacofiesta.com', '617-555-0107', '11AM-9PM'),
('Sunrise Diner', 'Restaurant', '258 Highland Ave, Boston, MA', 'Amy Chen', 'amy@sunrisediner.com', '617-555-0108', '6AM-3PM'),
('Organic Market', 'Grocery Store', '369 Mass Ave, Cambridge, MA', 'David Lee', 'david@organicmarket.com', '617-555-0109', '8AM-8PM'),
('Sweet Treats Bakery', 'Bakery', '741 Washington St, Boston, MA', 'Emily White', 'emily@sweettreats.com', '617-555-0110', '7AM-7PM');

-- Insert sample data for Volunteers (10 rows)
INSERT INTO Volunteers (first_name, last_name, email, phone, vehicle_type, availability, total_hours) VALUES
('James', 'Anderson', 'james.anderson@email.com', '617-555-0201', 'SUV', 'Weekdays 5PM-8PM', 12.5),
('Jennifer', 'Martinez', 'jennifer.martinez@email.com', '617-555-0202', 'Sedan', 'Weekends All Day', 25.0),
('Robert', 'Taylor', 'robert.taylor@email.com', '617-555-0203', 'Truck', 'Weekdays 6PM-9PM', 18.0),
('Linda', 'Thomas', 'linda.thomas@email.com', '617-555-0204', 'Van', 'Flexible Schedule', 32.5),
('Michael', 'Jackson', 'michael.jackson@email.com', '617-555-0205', 'SUV', 'Weekends Morning', 15.0),
('Patricia', 'White', 'patricia.white@email.com', '617-555-0206', 'Sedan', 'Weekdays 4PM-7PM', 20.0),
('Christopher', 'Harris', 'christopher.harris@email.com', '617-555-0207', 'Truck', 'Weekends Afternoon', 28.5),
('Barbara', 'Martin', 'barbara.martin@email.com', '617-555-0208', 'Van', 'Weekdays Evening', 22.0),
('Daniel', 'Thompson', 'daniel.thompson@email.com', '617-555-0209', 'SUV', 'Flexible Schedule', 35.0),
('Susan', 'Garcia', 'susan.garcia@email.com', '617-555-0210', 'Sedan', 'Weekends All Day', 19.5);

-- Insert sample data for Recipients (10 rows)
INSERT INTO Recipients (organization_name, org_type, address, capacity_lbs, contact_person, email, phone) VALUES
('Boston Food Bank', 'Food Bank', '99 Atkinson St, Boston, MA', 5000.00, 'Richard Jones', 'info@bostonfoodbank.org', '617-555-0301'),
('Hope Shelter', 'Shelter', '77 Southampton St, Boston, MA', 1500.00, 'Nancy Wilson', 'contact@hopeshelter.org', '617-555-0302'),
('Community Kitchen', 'Community Center', '55 Norfolk St, Cambridge, MA', 2000.00, 'Paul Moore', 'hello@communitykitchen.org', '617-555-0303'),
('Family Services Center', 'Community Center', '88 Winter St, Somerville, MA', 1000.00, 'Karen Taylor', 'info@familyservices.org', '617-555-0304'),
('Greater Boston Food Pantry', 'Food Bank', '123 Tremont St, Boston, MA', 3000.00, 'Steven Anderson', 'contact@gbfoodpantry.org', '617-555-0305'),
('Rosies Place', 'Shelter', '889 Harrison Ave, Boston, MA', 800.00, 'Margaret Thomas', 'info@rosiesplace.org', '617-555-0306'),
('North End Community Center', 'Community Center', '333 Hanover St, Boston, MA', 1200.00, 'Joseph Jackson', 'hello@northendcc.org', '617-555-0307'),
('Cambridge Family Shelter', 'Shelter', '555 Cambridge St, Cambridge, MA', 900.00, 'Betty White', 'contact@cambridgeshelter.org', '617-555-0308'),
('Somerville Food Pantry', 'Food Bank', '777 Broadway, Somerville, MA', 2500.00, 'Charles Harris', 'info@somervillefood.org', '617-555-0309'),
('Unity Community Kitchen', 'Community Center', '444 Mass Ave, Boston, MA', 1800.00, 'Dorothy Martin', 'hello@unitykitchen.org', '617-555-0310');