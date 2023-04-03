const express = require("express");
const router = express.Router();
const mysql = require("../mysql");

router.get("/all", async (req, res) => {
  const categoryList = await mysql.query("categoryList");
  res.send(categoryList);
});

router.get("/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const categoryList = await mysql.query("categoryDetail", product_category_id);
  res.send(categoryList);
  // res.send(categoryList[0]);
});

router.post("/", async (req, res) => {
  const result = await mysql.query("categoryInsert", req.body.param);
  res.send(result);
});

router.put("/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const result = await mysql.query("categoryUpdate", [
    req.body.param,
    product_category_id,
  ]);

  res.send(result);
});

router.delete("/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const result = await mysql.query("categoryDelete", product_category_id);

  res.send(result);
});

module.exports = router;
