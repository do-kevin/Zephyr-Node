/**
 * Reminder Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Reminder Router ---------------------------------------- /

module.exports = (router) => {
    router.get("/reminders/:id", (req, res) => {
        db.Reminder
            .findAll({
                where: {
                    id: req.params.id
                }
            })
            .then((reminders) => {
                res.status(200).json(reminders);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
