"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// models 폴더에서 생성된 model js 파일을 읽어와서 Squelize 모델로 변환
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model; // db 객체에 모델 정보 저장
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    // 테이블 맵핑을 위해 생성한 model 파일의 associate() 함수로 전체 모델 정보를 전달한 다음 모델 간의 연관 관계를 설정
    // 여기서 연관 관례라는 것은 RDMBS에서 외래키를 설정해서 테이블간의 관계 맺는 것과 유사
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
