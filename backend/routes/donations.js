const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// Get all donations
router.get("/", auth, async (req, res) => {
  try {
    const donations = await pool.query(`
      SELECT fd.*, d.business_name, d.address 
      FROM FoodDonations fd
      JOIN Donors d ON fd.donor_id = d.donor_id
      ORDER BY fd.created_at DESC
    `);
    res.json(donations.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single donation
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await pool.query(
      `
      SELECT fd.*, d.business_name, d.address 
      FROM FoodDonations fd
      JOIN Donors d ON fd.donor_id = d.donor_id
      WHERE fd.donation_id = $1
    `,
      [id]
    );

    if (donation.rows.length === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json(donation.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create donation
router.post("/", auth, async (req, res) => {
  try {
    const {
      donor_id,
      food_type,
      quantity_lbs,
      allergen_info,
      pickup_start,
      pickup_end,
      status,
    } = req.body;

    const newDonation = await pool.query(
      `INSERT INTO FoodDonations (donor_id, food_type, quantity_lbs, allergen_info, pickup_start, pickup_end, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        donor_id,
        food_type,
        quantity_lbs,
        allergen_info,
        pickup_start,
        pickup_end,
        status || "available",
      ]
    );

    res.status(201).json(newDonation.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update donation
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      donor_id,
      food_type,
      quantity_lbs,
      allergen_info,
      pickup_start,
      pickup_end,
      status,
    } = req.body;

    const updatedDonation = await pool.query(
      `UPDATE FoodDonations 
       SET donor_id = $1, food_type = $2, quantity_lbs = $3, allergen_info = $4,
           pickup_start = $5, pickup_end = $6, status = $7
       WHERE donation_id = $8 RETURNING *`,
      [
        donor_id,
        food_type,
        quantity_lbs,
        allergen_info,
        pickup_start,
        pickup_end,
        status,
        id,
      ]
    );

    if (updatedDonation.rows.length === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json(updatedDonation.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete donation
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonation = await pool.query(
      "DELETE FROM FoodDonations WHERE donation_id = $1 RETURNING *",
      [id]
    );

    if (deletedDonation.rows.length === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json({ message: "Donation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get donation statistics
router.get("/stats/overview", auth, async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_donations,
        SUM(quantity_lbs) as total_pounds,
        COUNT(CASE WHEN status = 'available' THEN 1 END) as available_donations,
        COUNT(CASE WHEN status = 'claimed' THEN 1 END) as claimed_donations,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_donations
      FROM FoodDonations
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
