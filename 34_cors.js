// cors - Cross-Origin Resource Sharing 교차 출처 리소스 공유
// Origin - http://localhost:3000
// URL의 구조 프로토콜, 호스트, 포트 합친것
// Cross-Origin - 프로토콜, 호스트, 포트 중에 하나라도 다르면 그것은 Origin 다른것.
// SOP(Same-Origin Policy) 정책 - 같은 Origin 인 경우만 리소스 접근 허용.
// Origin이 다른 경우 잠재적인 보안 위협이 있을 수 있기 때문에, 다른 Origin 리소스를 가져오는 것을 허용 안함.
// 클라이언트-서버 서로 다른 Origin을 갖는 경우가 발생.

const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:8080", // 허용할 origin 설정
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(3000, () => {
  console.log("서버가 3000번 포트로 시작 되었습니다.");
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/api/customers", (req, res) => {
  const customers = [
    { name: "유재석", email: "ryu@gmail.com", phone: "010-0000-0001" },
    { name: "김종국", email: "kim@gmail.com", phone: "010-0000-0002" },
    { name: "송지효", email: "song@gmail.com", phone: "010-0000-0003" },
  ];

  res.send(customers);
});

const corsOptionsExternal = {
  origin: "http://localhost:8081",
  optionsSuccessStatus: 200,
};

app.get("/api/products", cors(corsOptionsExternal), (req, res) => {
  res.send("제품 정보");
});
