/**
 * User Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export User Router ---------------------------------------- /

module.exports = (router) => {
    // Log user out on user id
    router.get("/users/logout", (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.status(200);
        } else {
            res.status(404);
        }
    });
    // Retrieve specific user at login
    router.post("/users/login", (req, res) => {
        const {username, password} = req.body;
        db.User
            .findOne({
                where: {username, password}
            })
            .then((user) => {
                const {dataValues: userData} = user;
                req.session.user = userData;
                res.status(200).json(userData);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create user for sign up
    router.post("/users/signUp", (req, res) => {
        db.User
            .create(req.body)
            .then((user) => {
                const {dataValues: userData} = user;
                req.session.user = userData;
                res.status(200).json(userData);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Update user on user id
    router.put("/users/:id", (req, res) => {
        const {id} = req.params;
        db.User
            .update(req.body, {
                where: {id}
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
        const {id} = req.params;
        db.User
            .update({
                phoneNumber: ""
            }, {
                where: {id}
            })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Delete user on user id
    router.delete("/users/:id", (req, res) => {
        const {id} = req.params;
        db.User
            .destroy({
                where: {id}
            })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });

    // Get user info by id
    router.get("/user/:id", (req, res) => {
        db.User.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
    })
};
