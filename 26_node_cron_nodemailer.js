const cron = require("node-cron");
require("dotenv").config({ path: "nodemailer/.env" });
const nodemailer = require("./nodemailer");
require("dotenv").config({ path: "mysql/.env.test" });
const mysql = require("./mysql");
const express = require("express");
const app = express();

// 정상적인 케이스 - 매일 특정 시간, 매주 월요일 아침 7시 등,
// 그 특정 주기 마다 발생한 신규 데이터만 조회해서 이메일로 전송
const task = cron.schedule(
  "* * * * *",
  async () => {
    const categoryList = await mysql.query("categoryList");
    const h = [];
    h.push(`<table style="border:1px solid black; border-collapse:collapse;"`);
    h.push(`<thead>`);
    h.push(`<tr>`);
    h.push(`<th style="border:1px solid black;">Category ID</th>`);
    h.push(`<th style="border:1px solid black;">Category Name</th>`);
    h.push(`<th style="border:1px solid black;">Category Description</th>`);
    h.push(`</tr>`);
    h.push(`</thead>`);
    h.push(`<tbody>`);
    categoryList.forEach((category) => {
      h.push(`<tr>`);
      h.push(
        `<td style="border:1px solid black;">${category.product_category_id}</td>`
      );
      h.push(
        `<td style="border:1px solid black;">${category.category_name}</td>`
      );
      h.push(
        `<td style="border:1px solid black;">${category.category_description}</td>`
      );
      h.push(`</tr>`);
    });
    h.push(`</tbody>`);
    h.push(`</table>`);

    const emailData = {
      from: "seungwon.go@gmail.com",
      to: "seungwon.go@gmail.com",
      subject: "신규 제품 카테고리 목록",
      html: h.join(""),
    };

    await nodemailer.send(emailData);
  },
  { scheduled: false }
);

app.listen(3000, () => {
  console.log("서버가 3000번 포트로 시작 되었습니다.");
});

app.get("/task/start", (req, res) => {
  task.start();
  res.send("Task가 시작 되었습니다.");
});

app.get("/task/stop", (req, res) => {
  task.stop();
  res.send("Task가 종료 되었습니다.");
});
