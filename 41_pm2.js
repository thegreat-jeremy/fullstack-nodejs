// npm install pm2 -g
// pm2 -version
// pm2 update

// pm2 start 41_pm2.js
// pm2 list
// pm2 stop 41_pm2.js
// pm2 logs
// pm2 monit 모니터링 대시보드
// pm2 delete all 실행중인 모든 프로세스 삭제
// 클러스터 모드 실행하는 방버
// pm2 start 파일명 -i <프로세스 개수>
// pm2 start 41_pm2.js -i 4
// 프로세스 개수 늘리고 싶다면
// pm2 scale 41_pm2.js +3
// 모든 cpu를 사용하고 싶다면
// pm2 start 41_pm2.js -i max

const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
