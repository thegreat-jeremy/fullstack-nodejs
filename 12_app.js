// express
const express = require("express");
const app = express();
const port = 3000;

app.use(
  express.json({
    limit: "50mb", // 최대 50메가
  })
);

app.listen(port, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});

// 라우터 (주소+http method)
app.get("/", (req, res) => {
  res.send("Hello World");
});

// http://localhost:3000/customers get
app.get("/customers", (req, res) => {
  // db에 있는 고객 정보를 조회하고 클라이언트로 응답
  const customers = [
    { name: "John Doe", email: "john@gmail.com" },
    { name: "Jane Doe", email: "jane@gmail.com" },
  ];
  res.send(customers);
});

app.get("/customer/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id", id);
  // db에 있는 고객 정보를 조회하고 클라이언트로 응답
  const customers = [
    { id: 1, name: "John Doe", email: "john@gmail.com" },
    { id: 2, name: "Jane Doe", email: "jane@gmail.com" },
  ];

  const customer = customers.filter((c) => c.id === id);
  if (customer.length > 0) res.status(200).send(customer[0]);
  else {
    res.status(401).send({ msg: "존재 하지 않는 ID 입니다." });
  }
});

app.post("/customer", (req, res) => {
  console.log(req.body.param);

  // 데이터베이스에 저장 코드

  res.send("Ok");
});
