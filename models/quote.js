module.exports = function (sequelize, DataTypes) {
    var Quote = sequelize.define("Quote", {
        quote: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },
        {
            timestamps: false
        });

    return Quote;
}