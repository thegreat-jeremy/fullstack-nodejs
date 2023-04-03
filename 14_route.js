const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});

// http://localhost:3000/abcd
// http://localhost:3000/acd
// ? - ? 바로 앞에 문자가 0개 혹은 1개
// app.get("/ab?cd", (req, res) => {
//   res.send("ab?cd");
// });

// http://localhost:3000/abcd
// http://localhost:3000/abbcd
// http://localhost:3000/abbbcd
// + - + 바로 앞에 문자가 1개 이상
// app.get("/ab+cd", (req, res) => {
//   res.send("ab+cd");
// });

// a 문자가 들어 있으면
app.get(/a/, (req, res) => {
  res.send("/a/");
});
