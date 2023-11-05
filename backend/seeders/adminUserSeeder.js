// const { Sequelize } = require('sequelize');
require('dotenv').config();
const { generateSalt, generateSecuredHash } = require("../helpers/security");

// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
// const db = {};

// const sequelize = new Sequelize(config);
// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     host: process.env.DB_HOSTNAME,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });



const models = require("../models");

// Function to seed an Admin user
async function seedAdminUser() {
  try {
    let salt = generateSalt();
    // Insert a new Admin user into the users table
    const adminUser = await models.User.create({
      email: 'admin@mail.com', // Change to the desired email
      password: generateSecuredHash('@AdminPwd', salt), // Change to the hashed password
      salt: salt, // Change to the salt value
      role: 'Admin', // Set the role to 'Admin' 
    });

    console.log('Admin user seeded successfully:', adminUser);
  } catch (error) {
    console.error('Error seeding Admin user:', error);
  } finally {
    // Close the database connection
    //await sequelize.close();
  }
}

// Call the seeder function
seedAdminUser();
