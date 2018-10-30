/**
 * Deck Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Deck Router ---------------------------------------- /

module.exports = (router) => {
    // Get all public decks
    router.get("/decks/public", (req, res) => {
        db.Deck
            .query("SELECT * FROM Decks WHERE private IS NOT false")
            .then((decks) => {
                res.status(200).json(decks);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Get all decks on user id
    router.get("/decks/users/:userId", (req, res) => {
        db.Deck
            .findAll({
                where: {
                    UserId: req.params.userId
                }
            })
            .then((decks) => {
                res.status(200).json(decks);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Get deck on deck id
    router.get("/decks/:id", (req, res) => {
        db.Deck
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((deck) => {
                res.status(200).json(deck);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create deck with user id
    router.post("/decks", (req, res) => {
        const {subject, private, dailyQuiz, time, userId} = req.body;
        db.Deck
            .create({
                subject,
                private,
                dailyQuiz,
                time,
                UserId: userId
            })
            .then((deck) => {
                res.status(200).json(deck);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Update deck on deck id
    router.put("/decks/:id", (req, res) => {
        db.Deck
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then((deck) => {
                res.status(200).json(deck);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Delete deck with deck id
    router.delete("/decks/:id", (req, res) => {
        db.Deck
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((deck) => {
                res.status(200).json(deck);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
