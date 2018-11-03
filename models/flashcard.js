module.exports = function (sequelize, DataTypes) {
    var Flashcard = sequelize.define("Flashcard", {
        front: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        back: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },
        {
            timestamps: false
        });
        Flashcard.associate = function (models) {
            Flashcard.belongsTo(models.Deck, {
                foreignKey: "deckId",
                onDelete: 'cascade' 
            });
        };

    return Flashcard;
}