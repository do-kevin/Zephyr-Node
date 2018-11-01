/**
 * Deck & Flashcard Router
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
                    userId: req.params.userId
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
    router.post("/decks/:userId", (req, res) => {
        db.Deck
            .create({
                ...req.body,
                userId: req.params.userId
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


    //----------------flashcards---------------

    //create flashcards, save with deckId
    router.post("/flashcard", (req, res) => {
        db.Flashcard
            .create(req.body)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });

    //get all flashcards that belong to given deckId
    router.get("/flashcard/:id", (req, res) => {
        db.Flashcard
            .findAll({
                where: {
                    deckId: req.params.id
                }
            })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });

    //update flashcard by id
    router.put("/flashcard/:id", (req, res) => {
        db.Flashcard
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });

    //delete flashcard by id
    router.delete("/flashcards/:id", (req, res) => {
        db.Flashcard
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
