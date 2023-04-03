require("dotenv").config({ path: "mysql/.env.test" });
const mysql = require("./mysql");
const xlsx = require("xlsx");

const getData = async () => {
  const categoryList = await mysql.query("categoryList");
  return categoryList;
};

const createXlsx = async () => {
  const workbook = xlsx.utils.book_new();
  const customerList = await getData();
  const firstSheet = xlsx.utils.json_to_sheet(customerList, {
    header: [
      "category_name",
      "product_category_id",
      "category_description",
      "use_yn",
    ],
    skipHeader: false,
  });

  firstSheet["!cols"] = [
    { wpx: 100 }, // category_name
    { wpx: 100 }, // product_category_id
    { wpx: 200 }, // category_description
    { wpx: 100 }, // use_yn
  ];

  xlsx.utils.book_append_sheet(workbook, firstSheet, "Product Category");
  xlsx.writeFile(workbook, "./xlsx/product_category.xlsx");
};

createXlsx();
