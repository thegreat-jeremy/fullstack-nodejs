const fs = require("fs"); // filesystem
const { Console } = require("console");

const output = fs.createWriteStream("./stdout.log");
const errorOutput = fs.createWriteStream("./stderr.log");

const logger = new Console({ stdout: output, stderr: errorOutput });
const count = 5;
logger.log("count: %d", count);
logger.error("count: " + count);

console.log("Hello World");
const world = "world";
console.log(`hello ${world}`);

console.error("에러 메시지 출력");
console.error(new Error("에러 메시지 출력"));

const arr = [
  { name: "John Doe", email: "john@gmail.com" },
  { name: "Jane Doe", email: "jane@gmail.com" },
];

console.log(arr);
console.table(arr);

const obj = {
  students: {
    grade1: { class1: {}, class2: {} },
    grade2: { class1: {}, class2: {} },
    teachers: ["John Doe", "Jane Doe"],
  },
};

console.log(obj);

console.dir(obj, { depth: 1, color: true });

console.time("func 1");
for (let i = 0; i < 999999; i++) {
  // 특정 코드
}
console.timeEnd("func 1");
