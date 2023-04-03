const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

// 로그관리
// 개발자에 의해서 의도적으로 기록하는 메시지
// 시스템을 운영하면서 발생하는 예기치 못한 에러

// rfs에서 지정한 파일 생성 시간 간격에 따른 로그 파일명을 반환
const generator = (time, index) => {
  if (!time) return "file.log";

  const yearmonth =
    time.getFullYear() + (time.getMonth() + 1).toString().padStart(2, "0");
  const day = time.getDate().toString().padStart(2, "0");
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");

  return `${yearmonth}${path.sep}${yearmonth}${day}-${hour}${minute}-${index}-file.log`;
};

const accessLogStream = rfs.createStream(generator, {
  interval: "1m", // 1d
  size: "10M",
  path: path.join(__dirname, "log"),
});

// app.use(morgan("combined", { stream: accessLogStream }));

app.use(
  morgan("combined", {
    stream: accessLogStream,
    // skip: function (req, res) {
    //   return res.statusCode < 400; // 정상적인 응답인 경우는 로그를 기록하지 않음. => 에러인 경우만 로그 기록
    // },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});
