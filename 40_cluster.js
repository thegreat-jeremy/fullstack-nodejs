// 클러스터링
// Node.js 싱글 스레드로 동작하고, 단일 CPU 코어에서만 실행
// 서버 자원이 8코어 혹은 16코어
// Node.js => 1코어만 사용
// cluster 모듈을 사용하면
// 서버 자원을 모두 사용하면서, Node.js 멀티스레드로 동작되는 것 처럼, 병렬처리 할 수 있게 됨

const cluster = require("cluster");
const express = require("express");
const { cpus } = require("os");
const process = require("process");

const numOfCPUs = cpus().length; // CPU 수

// Node.js의 클러스터 모듈에는 Primary 프로세스와 Worker 프로세스가 있습니다.

if (cluster.isPrimary) {
  console.log(`Primary ${process.id} is running`);

  // cpu 수 만큼 워크를 포크(생성)합니다.
  for (let i = 0; i < numOfCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.listen(3000, () => {
    console.log("서버가 포트 3000번으로 시작 되었습니다.");
  });

  console.log(`Worker ${process.pid} started`); // 실행되는 워커의 프로세스 id를 콘솔에 출력
}
