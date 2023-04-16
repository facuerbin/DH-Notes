module.exports = (sequelize, dataTypes) => {
    let alias = 'Topic';
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
        user_id: dataTypes.BIGINT(10).UNSIGNED,
    };
    let config = {
        timestamps: false,
    }
    const Topic = sequelize.define(alias, cols, config); 

    Topic.associate = function (models) {
        Topic.belongsTo(models.User, {
            as: "topic",
            foreignKey: "user_id"
        });

        Topic.belongsToMany(models.Note, {
            as: "notes",
            through: 'topic_has_notes',
            foreignKey: 'topic_id',
            otherKey: 'note_id',
            timestamps: false
        });
    }

    return Topic
};