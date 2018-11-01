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
        },
        note: {
            type: DataTypes.STRING,
        },
        sendAlert: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        alertTime: {
            type: DataTypes.INTEGER
        }

    },
        {
            timestamps: false
        });

        Reminder.associate = function (models) {
            Reminder.belongsTo(models.User, {
                foreignKey: "userId",
                allowNull: false
            });
            Reminder.hasMany(models.Appointment, {
                foreignKey: "reminderId",
                allowNull: true
            })
        };
    return Reminder;
}