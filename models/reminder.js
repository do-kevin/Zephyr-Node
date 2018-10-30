module.exports = function (sequelize, DataTypes) {
    var Reminder = sequelize.define("Reminder", {
        item: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
        {
            timestamps: false
        });

        Reminder.associate = function (models) {
            Reminder.belongsTo(models.User, {
                foreignKey: "userId",
            });
        };
    return Reminder;
}