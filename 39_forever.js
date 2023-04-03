const express = require("express");
const app = express();
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("./mysql");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.get("/api/categories", async (req, res) => {
  const categoryList = await mysql.query("categoryList");
  res.send(categoryList);
});

app.post("/api/category", async (req, res) => {
  // product_category_id, category_name, category_description
  const r = await mysql.query("categoryInsert", req.body.param);

  res.send(r);
});
