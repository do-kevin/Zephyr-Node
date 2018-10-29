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

    return Reminder;
}