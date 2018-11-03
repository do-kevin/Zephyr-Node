/**
 * User Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export User Router ---------------------------------------- /

module.exports = (router) => {
    // Log user out on user id
    router.get("/users/logout", (req, res) => {
        // FIXME:
        console.log("------------------------------------------------------------");
        console.log("Session User Id:", req.session.userId);
        console.log("Request Cookies:", req.cookies);
        res.clearCookie('user_sid');
        req.session.destroy();
        res.status(200).json({cookie: false});
    });
    // Retrieve specific user at login
    router.post("/users/login", (req, res) => {
        // FIXME:
        const {username, password} = req.body;
        db.User
            .findOne({
                where: {username, password}
            })
            .then((user) => {
                const {dataValues: userData} = user,
                    {id, name, username} = userData;
                console.log("------------------------------------------------------------");
                console.log("User Data:", userData);
                req.session.userId = id;
                res.status(200).json({id, name, username});
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Create user for sign up
    router.post("/users/signUp", (req, res) => {
        // FIXME:
        db.User
            .create(req.body)
            .then((user) => {
                const {dataValues: userData} = user,
                    {id, name, username} = userData;
                console.log("------------------------------------------------------------");
                console.log("User Data:", userData);
                req.session.userId = id;
                res.status(200).json({id, name, username});
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
