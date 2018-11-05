/**
 * Quote Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Reminder Router ---------------------------------------- /

module.exports = (router) => {

    // Retrieve all quotes from db
    router.get("/quotes", (req, res) => {
        console.log("get route")
        db.Quote
            .findAll({}).then((quotes) => {
                res.status(200).json(quotes);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};
