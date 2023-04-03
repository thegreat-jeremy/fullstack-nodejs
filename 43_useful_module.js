// validator
// 이메일, 알파벳, 알파벳+숫자, 날짜, 숫자, 신용카드, 국가별 스마트폰 번호 형식

// const validator = require("validator");

// const email = "seungwon.go@gmail.com";
// console.log("email", validator.isEmail(email));

// const alpha = "abcd";
// console.log("alpha", validator.isAlpha(alpha));

// const alphanumeric = "abcd123";
// console.log("alphanumerice", validator.isAlphanumeric(alphanumeric));

// const date = "2022-07-01";
// console.log("date", validator.isDate(date));
// const date2 = new Date();
// console.log("date2", validator.isDate(date2));

// const decimal = "3.1";
// console.log("decimal", validator.isDecimal(decimal));

// moment.js
// 날짜/시간 date를 처리하는 가장 대표적인 모듈
const moment = require("moment");
console.log(moment().format("YYYY-MM-DD"));
console.log(moment().format("MM-DD-YYYY"));
console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
console.log(moment().format("dddd"));

console.log(moment("2019-05-15", "YYYY-MM-DD").fromNow());
console.log(moment().startOf("day").fromNow());
console.log(moment().endOf("day").fromNow());

// 오늘 날짜 기준으로 7일전, 30일전
// 오늘 날짜 이후로 7일후, 30일후
// console.log(moment().subtract(7, "day").format("YYYY-MM-DD"));
// console.log(moment().subtract(7, "month").format("YYYY-MM-DD"));
// console.log(moment().subtract(7, "year").format("YYYY-MM-DD"));

// console.log(moment().add(7, "day").format("YYYY-MM-DD"));
// console.log(moment().add(7, "month").format("YYYY-MM-DD"));
// console.log(moment().add(7, "year").format("YYYY-MM-DD"));

// console.log(moment().add(-7, "day").format("YYYY-MM-DD"));

// dayjs - momentjs를 좀 가볍게 필요한 기능만 가지고 만든 모듈

// fs-extra
// fs - filesystem

const fs = require("fs-extra");
fs.copy("uploads/1655588726323.png", "uploads/copy.png")
  .then(() => {
    // code
  })
  .catch((err) => {
    console.log(err);
  });

//
