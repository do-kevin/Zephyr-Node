const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "zephyrnode",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "MYSQL_URL",
    dialect: "mysql",
  },
};
