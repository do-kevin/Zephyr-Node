/**
 * Todo Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Todo Router ---------------------------------------- /

module.exports = (router) => {
    // Get all todos by user id
    router.get("/todos/:id", (req, res) => {
        db.ToDo
            .findAll({
                where: {
                    id: req.params.id
                }
            })
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
