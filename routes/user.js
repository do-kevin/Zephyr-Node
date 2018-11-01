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
        }
        res.redirect('/');
    });
    // Retrieve specific user at login
    router.post("/users/login", (req, res) => {
        db.User
            .findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            .then((user) => {
                req.session.user = user;
                // TEST:
                console.log(req.session.user);
                res.status(301).redirect("/profile");
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
                res.status(200).json(user);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Update user on user id
    router.put("/users/:id", (req, res) => {
        db.User
            .update(req.body, {
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
    // Delete user on user id
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
