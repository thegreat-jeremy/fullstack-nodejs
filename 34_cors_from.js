const express = require("express");
const app = express();

app.listen(8080, () => {
  console.log("서버가 포트 8080번으로 시작 되었습니다.");
});

app.all("*", (req, res) => {
  res.sendFile(__dirname + "/34_cors_from.html");
});
