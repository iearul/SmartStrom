"use strict";

const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let salt = generateSalt();
    const adminUser = {
      email: 'admin@mail.com',
      password: generateSecuredHash('AdminPwd@123', salt),
      salt: salt,
      role: 'Admin',
      created_at: new Date(),
      updated_at: new Date(),
    };

    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      salt: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("Admin", "Guest"),
        default: "Guest",
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.bulkInsert('users', [adminUser], {});

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
