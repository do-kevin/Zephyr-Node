/**
 * Flashcard Router Depot
 */

// Dependencies ---------------------------------------- /

const router = require("express").Router();

// Mount Routers ---------------------------------------- /

// User routes
require("./user")(router);
// Todo routes
require("./todo")(router);
// Reminder routes
require("./reminder")(router);

// Export Router ---------------------------------------- /

module.exports = router;
