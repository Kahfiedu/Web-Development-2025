'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lessons', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      courseId: {
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'courses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      videoUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lessons');
  }
};