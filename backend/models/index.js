'use strict';
require('dotenv').config();
require("../config/sequelizeContext");

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { namespace } = require('../config/sequelizeContext');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

config.username = process.env.DB_USER || config.username;
config.password = process.env.DB_PASSWORD || config.password;
config.database = process.env.DB_NAME || config.database;
config.host = process.env.DB_HOST || config.host;
config.dialect = process.env.DB_DIALECT || config.dialect;

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}




// Define models first
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const PaperTrail = require('sequelize-paper-trail').init(sequelize, {
  debug: false,
  log: null,
  exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt', 'created_at', 'updated_at', 'deleted_at', 'revision'],
  revisionAttribute: 'revision',
  revisionModel: 'Revision',
  revisionChangeModel: 'RevisionChange',
  enableRevisionChangeModel: true,
  UUID: true,
  underscored: false,
  underscoredAttributes: false,
  defaultAttributes: {
    documentId: 'documentId',
    revisionId: 'revisionId'
  },
  userModel: "User",
  userModelAttribute: 'userId',
  enableCompression: false,
  enableMigration: true,
  enableStrictDiff: true,
  continuationNamespace: namespace,
  continuationKey: 'userId',
  metaDataFields: null,
  metaDataContinuationKey: 'metaData',
  mysql: true
});

PaperTrail.defineModels(db);

Object.keys(db).forEach(modelName => {
  if (modelName !== 'Revision' && modelName !== 'RevisionChange' && modelName !== 'User' && modelName !== 'Otp') {
    db[modelName].hasPaperTrail();
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
