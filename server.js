/**
 * Flashcard Application Server
 */

// Dependencies ---------------------------------------- /

const express = require("express"),
  path = require("path");

const db = require("./models"),
  router = require("./routes");

// Setup ---------------------------------------- /

// Server port
const PORT = process.env.PORT || 3001,
  // Express app
  app = express();

// User parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Mount Router ---------------------------------------- /

app.use(router);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Listen ---------------------------------------- /

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, () => {
    console.log(`Flashcard application running on port ${PORT}...`);
  });
});

//runs cron to check for notifications to be sent
const scheduler = require('./scheduler');

// var moment = require('moment-timezone');
// moment.tz.setDefault("America/Los_Angeles");

scheduler.start();

