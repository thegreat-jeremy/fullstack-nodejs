// Sequelize는 MySQL, MariaDB, MS SQL 등과 같은 RDBMS 데이터베이스를 위한 promise 기반의
// Node.js ORM 도구
// ORM - Object Relational Mapping
// 자바스크립트 객체와 데이터베이스를 별도의 쿼리문 작성 없이도 데이터베이스의 데이터를 손쉽게 조작할 수 있도록 맵핑
// sequelize-cli

const express = require("express");
const app = express();
const sequelize = require("./models").sequelize;

app.use(
  express.json({
    limit: "50mb",
  })
);

sequelize.sync(); // 모델에 정의한 테이블이 만약에 없다면, 테이블을 생성해 줍니다.

const { product_category } = require("./models"); // product_category 테이블에 대한 sequelize 모델

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.get("/api/categories", async (req, res) => {
  const categoryList = await product_category.findAll();
  res.send(categoryList);
});

app.post("/api/categories", async (req, res) => {
  const result = await product_category.create(req.body.param);
  res.send(result);
});

app.put("/api/categories/:product_category_id", async (req, res) => {
  const result = await product_category.update(req.body.param, {
    where: { product_category_id: req.params.product_category_id },
  });
  res.send(result);
});

app.delete("/api/categories/:product_category_id", async (req, res) => {
  const result = await product_category.destroy({
    where: { product_category_id: req.params.product_category_id },
  });

  res.send({ result: result });
});
