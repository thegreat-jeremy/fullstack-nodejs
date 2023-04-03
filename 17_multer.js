const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 업로드 된 파일이 저장될 위치
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // 업로드 된 파일의 이름 규칙을 정함
    cb(null, new Date().valueOf() + path.extname(file.originalname)); // 시스템 시간으로 파일이름을 변경해서 저장
  },
});

const upload = multer({ storage: storage });

app.post("/api/attachment", upload.single("attachment"), async (req, res) => {
  res.send(req.file);
});

app.post("/api/attachments", upload.array("attachments"), async (req, res) => {
  res.send(req.files);
});

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});
