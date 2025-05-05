'use strict';
const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hashedPassword = await bcrypt.hash("12345678", 10);

    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'admin' LIMIT 1;`
    );

    const adminRoleId = roles.length ? roles[0].id : null;

    if (!adminRoleId) {
      throw new Error("Role 'admin' tidak ditemukan. Pastikan seed roles sudah dijalankan.");
    }
    // Insert a demo user into the users table
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        emailVerified: new Date(),
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // Remove the demo user from the users table
    await queryInterface.bulkDelete('users', null, {});
  }
};
