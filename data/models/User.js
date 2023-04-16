module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
    }
    const User = sequelize.define(alias, cols, config); 

    User.associate = function (models) {
        User.hasMany(models.Topic, {
            as: "topic",
            foreignKey: 'user_id',
        })
    }

    return User
};