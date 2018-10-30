/**
 * Todo Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Todo Router ---------------------------------------- /

module.exports = (router) => {
    // Retrieve all todos on user id
    router.get("/todos/users/:userId", (req, res) => {
        db.ToDo
            .findAll({
                where: {
                    UserId: req.params.userId
                }
            })
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Retrieve one todo on todo id
    router.get("/todos/:id", (req, res) => {
        db.ToDo
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create todo with user id
    router.post("/todos/:userId", (req, res) => {
        db.ToDo
            .create({
                ...req.body,
                UserId: req.params.userId
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Update todo on todo id
    router.put("/todos/:id", (req, res) => {
        db.ToDo
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Delete todo on todo id
    router.delete("/todos/:id", (req, res) => {
        db.ToDo
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((todo) => {
                res.status(200).json(todo);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
