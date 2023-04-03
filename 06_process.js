const process = require("process");

// console.log(process.env);

process.on("beforeExit", (code) => {
  console.log("beforeExit 이벤트 리스너", code);
});

process.on("exit", (code) => {
  console.log("exit 이벤트 리스너", code);
});

console.log("1. 콘솔에 출력되는 첫 번째 메시지");
console.log("2. 콘솔에 출력되는 두 번째 메시지");
