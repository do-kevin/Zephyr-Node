/**
 * Reminder Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Reminder Router ---------------------------------------- /

module.exports = (router) => {
    // Retrieve all reminders on user id
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
    // Retrieve one reminder on reminder id
    router.get("/reminders/:id", (req, res) => {
        db.Reminder
            .findOne({
                where: {
                    id: req.body.id
                }
            })
            .then((reminder) => {
                res.status(200).json(reminder);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create reminder with user id
    router.post("/reminders/:userId", (req, res) => {
        db.Reminder
            .create({
                ...req.body,
                UserId: req.params.userId
            })
            .then((reminder) => {
                res.status(200).json(reminder);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Update reminder on reminder id
    router.put("/reminders/:id", (req, res) => {
        db.Reminder
            .update(req.body, {
                where: {
                    id
                }
            })
            .then((reminder) => {
                res.status(200).json(reminder);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Delete reminder on reminder id
    router.delete("/reminders/:id", (req, res) => {
        db.Reminder
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((reminder) => {
                res.status(200).json(reminder);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
