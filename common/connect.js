var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "bbrmlerqvli7oswsslka-mysql.services.clever-cloud.com",
  user: "uyqrkboeityueess",
  password: "RBBFBQbGdMA1aDiEG2YA",
  database: "bbrmlerqvli7oswsslka",
});

connection.connect(function (err) {
  if (err) console.error("ket noi k thanh cong");
});

module.exports = connection;
