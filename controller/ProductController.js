var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();

var routes = function()
{
    router.route("/")
        .get(function(req, res)
        {
            console.log(conn.connected);
            conn.connect().then(function()
            {
                var sqlQuery = "SELECT * FROM Products";
                var req = new sql.Request(conn);
                console.log(sqlQuery);
                req.query(sqlQuery).then(function(recordset){
                    res.json(recordset.recordset);
                    conn.close();
                })
                .catch(function(err){
                    conn.close();
                    res.status(400).send("Error while reading Data");
                });
            })
            .catch(function(err){
                conn.close();
                res.status(400).send("Error while reading Data");
            })
        });
        
    return router;
};

router.route('/')
        .post(function (req, res) {
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductName", sql.VarChar(50), req.body.ProductName)
                    request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice)
                    request.execute("Usp_InsertProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while inserting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while inserting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while inserting data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while inserting data");
            });
        });
        
module.exports = routes;