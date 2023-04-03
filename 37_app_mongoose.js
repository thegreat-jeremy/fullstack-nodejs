const express = require("express");
require("dotenv").config({ path: "mongodb/.env" });
const mongoDB = require("./mongoose"); //index.js
const Customer = require("./mongoose/schemas/customer");
const app = express();

mongoDB.connect();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 3000번 포트로 시작 되었습니다.");
});

app.get("/api/customers", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

app.post("/api/customer", async (req, res) => {
  const r = await Customer.create(req.body.param);
  res.send(r);
});
