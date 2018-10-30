module.exports = function (sequelize, DataTypes) {
    var Appointment = sequelize.define("Appointment", {
        // name: {
        //     type: DataTypes.STRING(30),
        //     allowNull: false,
        //     validate: {
        //         len: [1]
        //     }
        // },
        // phoneNumber: {
        //     type: DataTypes.STRING(15),
        //     allowNull: false,
        // },
        date: {                     //actual day and time of event
            type: DataTypes.STRING,
            allowNull: false
        },
        notification: {            //# of mins ahead of date that notification should be sent
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {                     //true if reminder has been sent already
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            timestamps: false
        });

        Appointment.associate = function (models) {
            Appointment.belongsTo(models.User, {
                foreignKey: "userId",
            });
        };

    return Appointment;
}