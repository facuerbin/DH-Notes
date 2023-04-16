module.exports = (sequelize, dataTypes) => {
    let alias = 'Note';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        body: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
    const Note = sequelize.define(alias, cols, config); 

    Note.associate = function (models) {
        Note.belongsToMany(models.Topic, {
            as: "topics",
            through: 'topic_has_notes',
            foreignKey: 'note_id',
            otherKey: 'topic_id',
            timestamps: false
        })
    }

    return Note
};