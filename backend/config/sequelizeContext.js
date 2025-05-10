const cls = require('cls-hooked');

// Create namespace for transaction and user tracking
const namespace = cls.createNamespace('app-namespace');

const Sequelize = require('sequelize');
Sequelize.useCLS(namespace);

// Log when namespace is created
console.log('CLS namespace initialized for sequelize context');

// Helper function to get current user ID
const getCurrentUserId = () => {
    return namespace.get('userId');
};

module.exports = {
    namespace,
    getCurrentUserId
};