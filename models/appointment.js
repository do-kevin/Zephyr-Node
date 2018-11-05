module.exports = function (sequelize, DataTypes) {
    var Appointment = sequelize.define("Appointment", {
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
        type: {                        //defines if it's an event or deck notification
            type: DataTypes.STRING,
            allowNull: false
        },
        front: {                        //if it's a flashcard, indicates if it's the front or back being stored
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    },
        {
            timestamps: false
        });

        Appointment.associate = function (models) {
            Appointment.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: 'cascade' 
            });
        };

    return Appointment;
}