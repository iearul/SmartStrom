'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.INTEGER,
      },
      included_kwh: {
        type: Sequelize.INTEGER,
      },
      base_cost: {
        type: Sequelize.FLOAT,
      },
      additional_kwh_cost: {
        type: Sequelize.FLOAT,
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

    await queryInterface.bulkInsert('products', [
      {
        name: 'Product A',
        type: 1,
        included_kwh: null, // Adjust this as needed
        base_cost: 5,
        additional_kwh_cost: 22,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Product B',
        type: 2,
        included_kwh: 4000,
        base_cost: 800,
        additional_kwh_cost: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
