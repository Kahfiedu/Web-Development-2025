'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here jika perlu
    }

    static async hashPassword(password) {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    }

    static async verifyPassword(inputPassword, hashedPassword) {
      return bcrypt.compare(inputPassword, hashedPassword);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true, // enable soft delete (adds deletedAt)
      timestamps: true, // default true, but better to be explicit
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await User.hashPassword(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await User.hashPassword(user.password);
          }
        }
      }
    }
  );

  return User;
};
