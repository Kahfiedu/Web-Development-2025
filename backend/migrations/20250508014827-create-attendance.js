'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      classId: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'classes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      lessonId: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'lessons',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      studentId: {
        type: Sequelize.STRING(36),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      childId: {
        type: Sequelize.STRING(36),
        allowNull: true,
        references: {
          model: 'children',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      scaneTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('hadir', 'izin', 'sakit', 'alfa'),
        allowNull: true,
      },
      excuseLetter: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'URL atau path file surat izin (jika ada)',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Keterangan tambahan terkait absensi',
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      code: {
        type: Sequelize.STRING(6),
        allowNull: true,
        unique: true,
        comment: 'Kode unik untuk absensi, misalnya digunakan dalam QR Code',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendances');
  }
};