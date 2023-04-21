require("dotenv").config();
const bodyParser = require("body-parser");
/**
 * Flashcard Application Server
 */

// Dependencies ---------------------------------------- /

const express = require("express"),
  path = require("path");

const db = require("./models"),
  router = require("./routes");

// Server port
const PORT = process.env.PORT || 3001,
  // Express app
  app = express();

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// User parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount Router ---------------------------------------- /

app.use(router);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Listen ---------------------------------------- /

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, () => {
    console.log("------------------------------------------------------------");
    console.log(`Flashcard application running on port ${PORT}...`);
  });
});

// Scheduler Start ---------------------------------------- /

//runs cron to check for notifications to be sent
const scheduler = require("./scheduler");
scheduler.start();

// var moment = require('moment-timezone');
// moment.tz.setDefault("America/Los_Angeles");
