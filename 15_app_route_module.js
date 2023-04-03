const express = require("express");
require("dotenv").config({ path: "mysql/.env.test" });

const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");

const app = express();

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
