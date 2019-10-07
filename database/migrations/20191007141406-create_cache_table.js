'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'cache',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                created_at: {
                    type: Sequelize.DATE
                },
                updated_at: {
                    type: Sequelize.DATE
                },
                from_currency_code: Sequelize.STRING,
                rates: Sequelize.TEXT,
            },
            {
                schema: 'public'
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cache')
    }
};
