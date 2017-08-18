var mysql = require('mysql');
var fs = require("fs");

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
	database : 'mydb'
});

/* fs.readFile(__dirname + "/" + "employee.json", 'utf8', function (err, data) {
    if (err) throw err;

    var sql = "INSERT INTO employee (name, joindate, department) VALUES ?";
    var values = JSON.parse(data);

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //var sql = "CREATE TABLE employee (id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), joindate date, department VARCHAR(255))";  

        console.log(values);
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });
});*/

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM employee", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}); 

/* con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
}); */