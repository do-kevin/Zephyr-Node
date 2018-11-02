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
        dailyQuiz: {                //boolean send daily questions to user throgh text
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        time: {
            type: DataTypes.STRING
        },
        alertInterval: {
            type: DataTypes.INTEGER
        }
    },
        {
            timestamps: false
        });

        Deck.associate = function (models) {
            Deck.hasMany(models.Flashcard, {
                foreignKey: "deckId",
                onDelete: 'cascade', 
                allowNull: false
            });
            Deck.hasMany(models.Appointment, {
                foreignKey: "deckId",
                onDelete: 'cascade',
                allowNull: true
            });
            Deck.hasMany(models.Tag, {
                foreignKey: "deckId",
                onDelete: "cascade",
                allowNull: true
            });
            Deck.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "cascade",
                allowNull: false
            });

    };
    return Deck;
}