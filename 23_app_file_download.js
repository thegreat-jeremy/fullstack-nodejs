const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mime = require("mime");

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.get("/file/:filename", (req, res) => {
  const file = "./uploads/" + req.params.filename;
  try {
    if (fs.existsSync(file)) {
      //   const mimetype = mime.getType(file);
      //   const filename = path.basename(file);
      //   res.setHeader("Content-disposition", "attachment; filename=" + filename); // 다운로드 되는 파일명
      //   res.setHeader("Content-Type", mimetype); // 파일 형식 지정
      //   const filestream = fs.createReadStream(file);
      //   filestream.pipe(res);
      res.download(file);
    } else {
      res.send("요청한 파일이 존재하지 않습니다.");
    }
  } catch (e) {
    console.log(e);
    res.send("파일을 다운로드 하는 중 에러가 발생했습니다.");
  }
});
