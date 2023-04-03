const express = require("express");
require("dotenv").config({ path: "mongodb/.env" });
const mongoDB = require("./mongodb");
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 3000번 포트로 시작 되었습니다.");
});

app.get("/api/customers", async (req, res) => {
  const customers = await mongoDB.find("customers");
  res.send(customers);
});

app.get("/api/customer/:_id", async (req, res) => {
  const customer = await mongoDB.findById("customers", req.params._id);
  res.send(customer);
});

app.post("/api/customer", async (req, res) => {
  const r = await mongoDB.insertOne("customers", req.body.param);
  res.send(r);
});

app.post("/api/customers", async (req, res) => {
  const r = await mongoDB.insertMany("customers", req.body.param);
  res.send(r);
});

app.put("/api/customer/:_id", async (req, res) => {
  const r = await mongoDB.updateById(
    "customers",
    req.body.param,
    req.params._id
  );
  res.send(r);
});

app.delete("/api/customer/:_id", async (req, res) => {
  const r = await mongoDB.deleteById("customers", req.params._id);
  res.send(r);
});
