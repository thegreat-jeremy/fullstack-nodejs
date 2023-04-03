const os = require("os");

console.log(os.arch()); // CPU 아키텍쳐
console.log(os.cpus()); // CPU 코어 정보
console.log(os.hostname()); // 운영체제 호스트명
console.log(os.type()); // 운영체제 타입
console.log(os.tmpdir()); // 임시 파일 저장 경로
