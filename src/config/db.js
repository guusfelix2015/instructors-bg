const { Poll } = require("pg");

module.exports = new Poll({
  user: "postgres",
  password: "postegres",
  host: "localhost",
  post: 5432,
  database: "gymmmanager",
});
