/**
 * Notes Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Notes Router ---------------------------------------- /

module.exports = (router) => {
    // Retrieve all notes by user id
    router.get("/notes/users/:userId", (req, res) => {
        db.Note
            .findAll({
                where: {
                    userId: req.params.userId
                }
            })
            .then((notes) => {
                res.status(200).json(notes);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Retrieve one note by note id
    router.get("/notes/:id", (req, res) => {
        db.Note
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((note) => {
                res.status(200).json(note);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create new note on user id
    router.post("/notes/:userId", (req, res) => {
        db.Note
            .create({
                ...req.body,
                userId: req.params.userId
            })
            .then((note) => {
                res.status(200).json(note);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Update note on note id
    router.put("/notes/:id", (req, res) => {
        db.Note
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then((note) => {
                res.status(200).json(note);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Delete note on note id
    router.delete("/notes/:id", (req, res) => {
        db.Note
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((note) => {
                res.status(200).json(note);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
