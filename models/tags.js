module.exports = function (sequelize, DataTypes) {
    var Tags = sequelize.define("Tags", {
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Tags.associate = function(models) {
        Tags.belongsTo(models.Deck, {
            foreignKey: "deckId"
        });
    };

    return Tags;
}