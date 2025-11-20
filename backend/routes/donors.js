const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// Get all donors
router.get("/", auth, async (req, res) => {
  try {
    const donors = await pool.query(
      "SELECT * FROM Donors ORDER BY created_at DESC"
    );
    res.json(donors.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single donor
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await pool.query("SELECT * FROM Donors WHERE donor_id = $1", [
      id,
    ]);

    if (donor.rows.length === 0) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json(donor.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create donor
router.post("/", auth, async (req, res) => {
  try {
    const {
      business_name,
      business_type,
      address,
      contact_person,
      email,
      phone,
      operating_hours,
    } = req.body;

    const newDonor = await pool.query(
      `INSERT INTO Donors (business_name, business_type, address, contact_person, email, phone, operating_hours)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        business_name,
        business_type,
        address,
        contact_person,
        email,
        phone,
        operating_hours,
      ]
    );

    res.status(201).json(newDonor.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      // Unique violation
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// Update donor
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      business_name,
      business_type,
      address,
      contact_person,
      email,
      phone,
      operating_hours,
    } = req.body;

    const updatedDonor = await pool.query(
      `UPDATE Donors 
       SET business_name = $1, business_type = $2, address = $3, contact_person = $4, 
           email = $5, phone = $6, operating_hours = $7
       WHERE donor_id = $8 RETURNING *`,
      [
        business_name,
        business_type,
        address,
        contact_person,
        email,
        phone,
        operating_hours,
        id,
      ]
    );

    if (updatedDonor.rows.length === 0) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json(updatedDonor.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete donor
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonor = await pool.query(
      "DELETE FROM Donors WHERE donor_id = $1 RETURNING *",
      [id]
    );

    if (deletedDonor.rows.length === 0) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
