require("dotenv").config({ path: "nodemailer/.env" });
const nodemailer = require("./nodemailer");
require("dotenv").config({ path: "mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");
const express = require("express");
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

const sendAttachmentEmail = async (emailData, workbook) => {
  // const emailData = {
  //     from: "seungwon.go@gmail.com",
  //     to: "seungwon.go@gmail.com",
  //     subject: "엑셀 파일 첨부 테스트",
  //     text: "엑셀 파일 첨부해서 이메일을 보내드립니다.",
  //     attachments: [
  //         {
  //             filename: "Categories.xlsx",
  //             content: Buffer.from(xlsx.write(workbook, {type:"base64"}), "base64")
  //         }
  //     ]
  // }

  emailData.attachments = [
    {
      filename: "Categories.xlsx",
      content: Buffer.from(xlsx.write(workbook, { type: "base64" }), "base64"),
    },
    {
      filename: "ERD 다이어그램.png",
      path: "./uploads/1655588726323.png",
    },
  ];

  const r = await nodemailer.send(emailData);
  return r;
};

app.post("/api/email/attachment", async (req, res) => {
  const categoryList = await mysql.query("categoryList");
  const workbook = xlsx.utils.book_new();

  const firstSheet = xlsx.utils.json_to_sheet(categoryList, {
    header: [
      "product_category_id",
      "category_name",
      "category_description",
      "use_yn",
    ],
    skipHeader: false,
  });

  firstSheet["!cols"] = [{ wpx: 160 }, { wpx: 160 }, { wpx: 160 }, { wpx: 80 }];

  xlsx.utils.book_append_sheet(workbook, firstSheet, "Categories");

  const r = await sendAttachmentEmail(req.body.param, workbook);

  res.send(r);
});
