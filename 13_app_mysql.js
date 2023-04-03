const express = require("express");
const app = express();
const port = 3000;

// app.get("env")

require("dotenv").config({ path: `mysql/.env.${app.get("env")}` });

const mysql = require("./mysql");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(port, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});

app.get("/api/products", async (req, res) => {
  const productList = await mysql.query("productList");
  res.send(productList);
});

app.get("/api/categories", async (req, res) => {
  const categoryList = await mysql.query("categoryList");
  res.send(categoryList);
});

app.get("/api/category/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const categoryList = await mysql.query("categoryDetail", product_category_id);
  res.send(categoryList);
  // res.send(categoryList[0]);
});

app.post("/api/category", async (req, res) => {
  const result = await mysql.query("categoryInsert", req.body.param);
  res.send(result);
});

app.put("/api/category/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const result = await mysql.query("categoryUpdate", [
    req.body.param,
    product_category_id,
  ]);

  res.send(result);
});

app.delete("/api/category/:product_category_id", async (req, res) => {
  const product_category_id = req.params.product_category_id;
  const result = await mysql.query("categoryDelete", product_category_id);

  res.send(result);
});
