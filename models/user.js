module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        phoneNumber: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: false
        });

        User.associate = function (models) {
            User.hasMany(models.Deck, {
                foreignKey: "userId",
                onDelete: 'cascade' 
            });
            User.hasMany(models.Reminder, {
                foreignKey: "userId",
                onDelete: 'cascade' 
            });
            User.hasMany(models.ToDo, {
                foreignKey: "userId",
                onDelete: 'cascade' 
            });
            User.hasMany(models.Note, {
                foreignKey: "userId",
                onDelete: 'cascade' 
            });
            User.hasMany(models.Appointment, {
                foreignKey: "userId",
                onDelete: 'cascade' 
            });
    };
    return User;
}