/**
 * User Router
 */

// Dependencies ---------------------------------------- /

const bcrypt = require('bcrypt');
const db = require("../models");

// Global Variables ---------------------------------------- /

const saltRounds = 10;

// Export User Router ---------------------------------------- /

module.exports = (router) => {
    // Log user out on user id
    router.get("/users/logout", (req, res) => {
        res.status(200).json({ status: "Logged Out" });
    });
    // Retrieve specific user at login
    router.post("/users/login", (req, res) => {
        const {username, password} = req.body;
        db.User
            .findOne({
                where: {username}
            })
            .then((user) => {
                const { dataValues: userData } = user,
                    { id, name, username, password: passwordHash } = userData;
                console.log("Password Hash:", passwordHash);
                bcrypt.compare(password, passwordHash, (err, compareRes) => {
                    if (compareRes) {                        
                        res.status(200).json({ id, name, username });
                    } else {
                        res.status(401).json(err);
                    }
                });
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create user for sign up
    router.post("/users/signUp", (req, res) => {
        const { name, username, password } = req.body;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (!err) {
                db.User
                    .create({ name, username, password: hash })
                    .then((user) => {
                        const { dataValues: userData } = user,
                            { id, name, username } = userData;
                        res.status(200).json({ id, name, username });
                    })
                    .catch((err) => {
                        res.status(404).json(err);
                    });
            } else {
                res.status(500).json(err);
            }
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
