const express = require("express");
const app = express();
require("dotenv").config({ path: "mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.get("/api/xlsx/download", async (req, res) => {
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

  firstSheet["!cols"] = [{ wpx: 160 }, { wpx: 160 }, { wpx: 200 }, { wpx: 80 }];

  xlsx.utils.book_append_sheet(workbook, firstSheet, "Categories");
  res.setHeader("Content-disposition", "attachment; filename=Categories.xlsx");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  const downloadFile = Buffer.from(
    xlsx.write(workbook, { type: "base64" }),
    "base64"
  );

  res.end(downloadFile);
});
