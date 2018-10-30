module.exports = function (sequelize, DataTypes) {
    var Deck = sequelize.define("Deck", {
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        private: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dailyQuiz: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        time: {
            type: DataTypes.DATE
        }
    },
        {
            timestamps: false
        });

        Deck.associate = function (models) {
            Deck.hasMany(models.Flashcard, {
                foreignKey: "deckId",
                onDelete: 'cascade' 
            });
            Deck.belongsTo(models.User, {
                foreignKey: "userId",
            });
    };
    return Deck;
}