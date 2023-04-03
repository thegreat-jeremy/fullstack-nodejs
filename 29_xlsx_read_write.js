const xlsx = require("xlsx");

const workbook = xlsx.readFile("./xlsx/test.xlsx"); // 엑셀 파일 읽고, 메모리상에 워크북 생성
const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트 이름
const firstSheet = workbook.Sheets[firstSheetName]; // 첫번째 시트
console.log(firstSheet["A2"].v); // 엑셀 첫번째 시트의 A2 셀 값
firstSheet["B2"].v = "john@gmail.com"; // 이메일 주소 변경
firstSheet["A3"] = { t: "s", v: "Jane Doe" };
firstSheet["B3"] = { t: "s", v: "jane@gmail.com" };
firstSheet["C3"] = { t: "s", v: "010-1111-1111" };

xlsx.writeFile(workbook, "./xlsx/test2.xlsx");
