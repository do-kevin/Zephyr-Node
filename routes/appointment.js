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
    // // Create appointment
    // router.post("/appointments/:userId", (req, res) => {
    //     db.Appointment
    //         .create({
    //             ...req.body,
    //             UserId: req.params.userId
    //         })
    //         .then((appointment) => {
    //             res.status(200).json(appointment);
    //         })
    //         .catch((err) => {
    //             res.status(404).json(err);
    //         });
    // });
    
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

    // Update flashcard appointment message
    router.put("/appointments/flashcard/:id", (req, res) => {
        const {message, front} = req.body;
        db.Appointment
            .update({
                    message
                }, {
                    where: {
                        flashcardId: req.params.id,
                        front
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
        // console.log(req.body)
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

    // Delete single flashcard appointment by flashcardId
    router.delete("/appointments/decks/:id", (req, res) => {
        // console.log(req.body)
        db.Appointment
            .destroy({
                where: {
                    flashcardId: req.params.id
                }
            })
            .then((appointment) => {
                res.status(200).json(appointment);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });

    // Delete daily quiz appointment by deckId and userId
    router.delete("/appointments/decks/:deckId/:userId", (req, res) => {
        // console.log(req.body)
        db.Appointment
            .destroy({
                where: {
                    deckId: req.params.deckId,
                    userId: req.params.userId
                }
            })
            .then((appointment) => {
                res.status(200).json(appointment);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });

      // get appointments by deckId and userId
      router.get("/appointments/decks/:id/:userId", (req, res) => {
        // console.log(req.body)
        db.Appointment
            .findAll({
                where: {
                    deckId: req.params.id,
                    userId: req.params.userId
                },
                order: [
                    ['date', 'ASC']
                ]
            })
            .then((appointment) => {
                res.status(200).json(appointment);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    });

};