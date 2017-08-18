var http = require("http");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var Sequelize = require('sequelize');
var cors = require('cors');

var sequelize = new Sequelize('mydb', 'root', 'p@ssw0rd', {
    host: 'localhost',
    dialect: 'mssql'
})

app.use(bodyParser.json());
app.use(cors());

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

var Employee = sequelize.define('employee', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING },
    joindate: { type: Sequelize.DATE },
    department: { type: Sequelize.STRING }
});

sequelize.sync({ force: true }).then(() => {
    // Table created
    console.log("Table Created");
}).catch(err => {
    console.log(err);
});

app.get('/api/emp', function (req, res) {

    res.json("Call");
    //Employee.findAll().then(function (employee) {
    //    res.json(employee);
    //}).catch(function (err) {
    //    console.log(err);
    //});
})

var server = app.listen(1433, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})