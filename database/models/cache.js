module.exports = (sequelize, DataTypes) => {
    const Cache = sequelize.define(
        'Cache',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            from_currency_code: DataTypes.STRING,
            rates: DataTypes.TEXT,
        },
        {
            // Timestamps
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',

            // Table name
            freezeTableName: true,
            tableName: 'cache',
        }
    );
    Cache.associate = function() {};
    return Cache;
};
