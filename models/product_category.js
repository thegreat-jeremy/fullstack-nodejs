"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_category.init(
    {
      product_category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }, // type, primaryKey, allowNull, unique, defaultValue, autoincreament
      category_name: { type: DataTypes.STRING, allowNull: false },
      category_description: DataTypes.STRING,
      use_yn: { type: DataTypes.STRING, defaultValue: "Y" },
    },
    {
      sequelize,
      timestamps: false, // createdAt, updatedAt 컬럼 없음
      modelName: "product_category", // customer -> customers, product_category -> product_categories
      tableName: "product_category",
    }
  );
  return product_category;
};
