module.exports = function (sequelize, DataTypes) {
    var ToDo = sequelize.define("ToDo", {
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
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {
            timestamps: false
        });

        ToDo.associate = function (models) {
            ToDo.belongsTo(models.User, {
                foreignKey: "userId",
            });
        };

    return ToDo;
}