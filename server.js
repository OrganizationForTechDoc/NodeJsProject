var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'myempdb'
});

con.connect();
app.use(bodyParser.json());


app.get('/listUsers', function (req, res) {
    /* fs.readFile( __dirname + "/" + "employee.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    }); */

    //var data = GetEmployees();
    con.query("SELECT * FROM employee", function (err, result, fields) {
        if (err)
            throw err;
        res.send(result);
    });
})

app.post('/addUser/', function (req, res) {
    // First read existing Employees.
    /*fs.readFile(__dirname + "/" + "employee.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["emp4"] = employee["emp4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });*/
    var sqlquery = "insert into employee (name, joindate, department) values ('" + req.body.name + "','" + req.body.joindate + "','" + req.body.department + "')";
    con.query(sqlquery, function (err, result, fields) {
        if (err)
            throw err;
        res.send("Inserted Sucessfully...." + result.insertId);
    });
})

app.put('/editUser/:id', function (req, res) {
    //console.log(req.params.id);
    var sqlquery = "update employee set name='" + req.body.name + "', joindate='" + req.body.joindate + "', department='" + req.body.department + "' where id=" + req.params.id;
    con.query(sqlquery, function (err, result, fields) {
        if (err)
            throw err;
        res.send("Updated Successfully.... ");
    });
})

app.get('/listUsers/:id', function (req, res) {
    // First read existing Employees.
    /*fs.readFile(__dirname + "/" + "employee.json", 'utf8', function (err, data) {
        var employees = JSON.parse(data);
        var employee = employees["emp" + req.params.id]
        console.log(employee);
        res.end(JSON.stringify(employee));
    });*/
    var sqlquery = "select * from employee where id=" + req.params.id;
    con.query(sqlquery, function (err, result, fields) {
        if (err)
            throw err;
        res.send(result);
    });
})

app.delete('/deleteUser/:id', function (req, res) {

    // First read existing Employees.
    /*fs.readFile(__dirname + "/" + "employee.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["emp" + 2];

        console.log(data);
        res.end(JSON.stringify(data));
    });*/
    var sqlquery = "delete from employee where id=" + req.params.id;
    con.query(sqlquery, function (err, result, fields) {
        if (err)
            throw err;
        res.send("Deleted Successfully...");
    });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})