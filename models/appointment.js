module.exports = function (sequelize, DataTypes) {
    var Appointment = sequelize.define("Appointment", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        notification: {
            type: DataTypes.STRING,
            defaultValue: false
        },
        timeZone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
        {
            timestamps: false
        });

    return Appointment;
}