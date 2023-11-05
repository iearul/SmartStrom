'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.INTEGER,
      included_kwh: DataTypes.INTEGER, // Use snake_case
      base_cost: DataTypes.FLOAT,      // Use snake_case
      additional_kwh_cost: DataTypes.FLOAT, // Use snake_case
    },
    {
      sequelize,
      modelName: 'Product',
      underscored: true,
      tableName: "products",
    }
  );
  return Product;
};
