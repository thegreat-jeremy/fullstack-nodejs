// Nodemailer

// 다른 모듈에 의존성이 없는 모듈
// 유니코드를 지원함 - 영어 뿐만 아니라, 한국어, 중국어 등  다양한 언어로 메일을 작성할 수  있음.
// 파일 첨부 기능
// 이메일 본문에 일반 텍스트 뿐만 아니라, HTML 삽입이 가능
// OAuth2
// SMTP 연결을 위한 프록시 사용 가능

const express = require("express");
const app = express();

require("dotenv").config({ path: "nodemailer/.env" });
const nodemailer = require("./nodemailer");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.post("/api/email", async (req, res) => {
  console.log(req.body.param);
  const r = await nodemailer.send(req.body.param);

  res.send(r);
});
