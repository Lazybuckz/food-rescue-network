const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// Get all volunteers
router.get("/", auth, async (req, res) => {
  try {
    const volunteers = await pool.query(
      "SELECT * FROM Volunteers ORDER BY created_at DESC"
    );
    res.json(volunteers.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single volunteer
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await pool.query(
      "SELECT * FROM Volunteers WHERE volunteer_id = $1",
      [id]
    );

    if (volunteer.rows.length === 0) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.json(volunteer.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create volunteer
router.post("/", auth, async (req, res) => {
  try {
    const { first_name, last_name, email, phone, vehicle_type, availability } =
      req.body;

    const newVolunteer = await pool.query(
      `INSERT INTO Volunteers (first_name, last_name, email, phone, vehicle_type, availability)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, email, phone, vehicle_type, availability]
    );

    res.status(201).json(newVolunteer.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// Update volunteer
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      phone,
      vehicle_type,
      availability,
      total_hours,
    } = req.body;

    const updatedVolunteer = await pool.query(
      `UPDATE Volunteers 
       SET first_name = $1, last_name = $2, email = $3, phone = $4, 
           vehicle_type = $5, availability = $6, total_hours = $7
       WHERE volunteer_id = $8 RETURNING *`,
      [
        first_name,
        last_name,
        email,
        phone,
        vehicle_type,
        availability,
        total_hours,
        id,
      ]
    );

    if (updatedVolunteer.rows.length === 0) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.json(updatedVolunteer.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete volunteer
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVolunteer = await pool.query(
      "DELETE FROM Volunteers WHERE volunteer_id = $1 RETURNING *",
      [id]
    );

    if (deletedVolunteer.rows.length === 0) {
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
