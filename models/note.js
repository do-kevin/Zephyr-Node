module.exports = function (sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
        note: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },
        {
            timestamps: false
        });

        Note.associate = function (models) {
            Note.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: 'cascade' 
            });
        };

    return Note;
}