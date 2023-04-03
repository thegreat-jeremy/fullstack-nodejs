const express = require("express");
const router = express.Router();
const mysql = require("../mysql");

// /api/product/all
router.get("/all", async (req, res) => {
  const productList = await mysql.query("productList");
  res.send(productList);
});

module.exports = router;
