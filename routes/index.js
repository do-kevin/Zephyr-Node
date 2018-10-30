/**
 * Flashcard Router Depot
 */

// Dependencies ---------------------------------------- /

const router = require("express").Router();

// Mount Routers ---------------------------------------- /

// User routes
require("./user")(router);

// Export Router ---------------------------------------- /

module.exports = router;
