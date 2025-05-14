const express = require("express");
const pool = require("../db");
const router = express.Router();

// visitors post router
router.post("/visit", async (req, res) => {
  const { visitorId } = req.body;
  const today = new Date().toISOString().split("T")[0];

  try {
    // Check if the visitor already logged today
    const exists = await pool.query(
      "SELECT * FROM visitors WHERE visitors_id = $1 AND visit_date = $2",
      [visitorId, today]
    );

    if (exists.rows.length > 0) {
      return res.status(200).json({ message: "Already logged today" });
    }

    // Insert new visitor record
    await pool.query(
      "INSERT INTO visitors (visitors_id, visit_date) VALUES ($1, $2)",
      [visitorId, today]
    );

    res.status(201).json({ message: "Unique visitor logged" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get visitors router
router.get("/get-today-visitors", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM visitors WHERE visit_date = $1",
      [today]
    );

    const count = parseInt(result.rows[0].count, 10);

    return res.status(200).json({
      message: "Today's visitor count",
      visitors: count,
    });
  } catch (error) {
    console.error("Error fetching today's visitors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all days visitores
router.get("/get-all-days-visitors", async (req, res) => {
  try {
    const allVisitors = await pool.query("SELECT COUNT(*) FROM visitors");
    const totalCount = parseInt(allVisitors.rows[0].count, 10);
    return res
      .status(200)
      .json({ message: "total visitors", visitors: totalCount });
  } catch (error) {
    console.error("Error fetching today's visitors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
