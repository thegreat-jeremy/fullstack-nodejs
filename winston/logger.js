const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file"); // 로그 파일을 일자별로 생성하기 위해서
const path = require("path");
const appRoot = require("app-root-path");
const { createLogger } = require("winston");
const process = require("process");

const logDir = `${appRoot}/logs`; // logs 디렉토리 하위에 로그 파일 저장

const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // 로그 출력 포맷 정의
});

const logger = createLogger({
  format: combine(label({ label: "NODE_PROJECT" }), timestamp(), logFormat),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: "%DATE%.log",
      maxSize: "20m", // 로그파일 크기
      maxFiles: "30d", // 최근 30일치 로그 파일만 보관
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: "%DATE%.error.log",
      maxSize: "20m", // 로그파일 크기
      maxFiles: "30d", // 최근 30일치 로그 파일만 보관
    }),
  ],
});

if (process.env.NODE_ENV != "prod") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;
