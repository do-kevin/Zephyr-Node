/**
 * Appointments Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Appointments Router ---------------------------------------- /

module.exports = (router) => {
    // Retrieve all appointments by user id
    router.get("/appointments/users/:userId", (req, res) => {
        db.Appointment
            .findAll({
                where: {
                    UserId: req.params.userId
                }
            })
            .then((appointments) => {
                res.status(200).json(appointments);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    // Retrieve one appointment by appointment id
    router.get("/appointments/:id", (req, res) => {
        db.Appointment
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((appointment) => {
                res.status(200).json(appointment);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
    //  Update appointment by appointment id
    router.put("/appointments", (req, res) => {
        const {name, phoneNumber, notification, timeZone, time, id} = req.body;
        db.Appointment
            .update({
                    name, 
                    phoneNumber, 
                    notification, 
                    timeZone, 
                    time
                }, {
                    where: {
                        id
                    }
            })
            .then((appointment) => {
                res.status(200).json(appointment);
            })
            .catch((err) => {
                res.status(404).json(appointment);
            });
    });
    // Delete appointment on appointment id
    router.delete("/appointments", (req, res) => {
        db.Appointment
            .destroy({
                where: {
                    id: req.body.id
                }
            })
            .then((appointment) => {
                res.status(200).json(appointment);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });
};