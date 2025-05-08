'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.Class, {
        foreignKey: 'classId',
        as: 'class',
        onDelete: 'CASCADE',
      });

      Attendance.belongsTo(models.Lesson, {
        foreignKey: 'lessonId',
        as: 'lesson',
        onDelete: 'CASCADE',
      });

      Attendance.belongsTo(models.User, {
        foreignKey: 'studentId',
        as: 'student',
        onDelete: 'CASCADE',
      });

      Attendance.belongsTo(models.Child, {
        foreignKey: 'childId',
        as: 'child',
        onDelete: 'CASCADE',
      });
    }
  }

  Attendance.init({
    classId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    childId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    scanTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('hadir', 'izin', 'sakit', 'alfa'),
      defaultValue: 'present',
      allowNull: false,
    },
    excuseLetter: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL atau path file surat izin (jika ada)',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Keterangan tambahan terkait absensi',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      comment: 'Kode unik untuk absensi, misalnya digunakan dalam QR Code',
    },
  }, {
    sequelize,
    modelName: 'Attendance',
    paranoid: true, // mengaktifkan soft delete
    tableName: 'attendances',
  });

  return Attendance;
};
