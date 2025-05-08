'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Revisions', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      model: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      document: {
        type: Sequelize.JSON, // Gunakan JSON, bukan JSONB di MariaDB
        allowNull: false
      },
      operation: {
        type: Sequelize.STRING(7),
        allowNull: false
      },
      documentId: {
        type: Sequelize.INTEGER, // Atau UUID jika kamu aktifkan UUID
        allowNull: false
      },
      revision: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        references: { model: 'users', key: 'id' },
        allowNull: true,
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Revisions');
  }
};
