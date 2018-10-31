/**
 * Appointments Router
 */

// Dependencies ---------------------------------------- /

const db = require("../models");

// Export Appointments Router ---------------------------------------- /

module.exports = (router) => {
    // Create an appointment
    router.post("/appointment", (req, res) => {
        db.Appointment
            .create(req.body)
            .then((appointments) => {
                res.status(200).json(appointments);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    })
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
    //  Update reminder appointment by id
    router.put("/appointments/reminders", (req, res) => {
        const {date, notification, message, reminderId} = req.body;
        db.Appointment
            .update({
                    date,  
                    notification, 
                    message
                }, {
                    where: {
                        reminderId
                    }
            })
            .then((appointment) => {
                res.status(200).json(appointment);
            })
            .catch((err) => {
                res.status(404).json(appointment);
            });
    });
    // Delete reminder appointment by id
    router.delete("/appointments/reminders/:id", (req, res) => {
        console.log(req.body)
        db.Appointment
            .destroy({
                where: {
                    reminderId: req.params.id
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