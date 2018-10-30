/**
 * User Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export User Router ---------------------------------------- /

module.exports = (router) => {
    // Retrieve specific user at login
    router.get("/users", (req, res) => {
        db.User
            .findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create user for sign up
    router.post("/users", (req, res) => {
        const {name, username, password, phoneNumber} = req.body,
            user = {name, username, password};
        if (phoneNumber) user.phoneNumber = phoneNumber;
        db.User
            .create(user)
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Update user on user id
    router.put("/users/:id", (req, res) => {
        const {name, username, password, phoneNumber} = req.body;
        db.User
            .update({
                name, username, password, phoneNumber: phoneNumber || ""
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Delete user phoneNumber on user id
    router.delete("/users/phoneNumber/:id", (req, res) => {
        db.User
            .update({
                phoneNumber: ""
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Delete user name on user id
    router.delete("/users/:id", (req, res) => {
        db.User
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
