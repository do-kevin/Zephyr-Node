'use strict';

var moment = require('moment-timezone');
moment().tz("America/Los_Angeles").format();
const db = require("../models");

const keys = require("../keys.js");
const accountSid = keys.accountSid;
const authToken = keys.authToken;
const client = require('twilio')(accountSid, authToken);

const notificationWorkerFactory = function () {
  return {
    run: function () {
      console.log("start");
      db.Appointment.findAll({
        include: [{
          model: db.User
        }]
      })
        .then(function (data) {
          let objArr = [];
          data.forEach(item => {
            let obj = {
              date: item.dataValues.date,
              notification: item.dataValues.notification,
              message: item.dataValues.message,
              name: item.dataValues.User.dataValues.name,
              phoneNumber: item.dataValues.User.dataValues.phoneNumber,
            }
            objArr.push(obj);
          })
          // console.log(objArr);

          let appts = objArr.filter(item => {
            return requiresNotification(item);
          })
          if (appts.length > 0) {
            sendNotifications(appts);
          }
          else {
            console.log("no reminders")
          }
        }).catch(function (err) {
          return console.log(err);
        });

      function requiresNotification(apptObj) {
        let currentTime = moment().local().format("YYYY-MM-DD HH:mm");
        return Math.round(moment.duration(moment(apptObj.date).utc()
          .diff(moment(currentTime).utc())
        ).asMinutes()) === apptObj.notification;

      }
      function sendNotifications(appts) {
        appts.forEach(item => {
          let obj = {
            phone: item.phoneNumber,
            msg: item.message
          };
          client.messages
            .create({
              body: obj.msg,
              from: '+18582643579',
              to: obj.phone
            })
            .then(function (response) {

            })
            .done();
        });
      };
    },
  };
};

module.exports = notificationWorkerFactory();
