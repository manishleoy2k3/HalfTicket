var express = require('express');
const res = require('express/lib/response');
var app = express();
var port = process.env.port || 1337

var productController = require('./Controller/ProductController')();

app.use("/api/products", productController);

app.get("/product", function(request, response){
    response.json({"Message":"Welcome to Node Js"})
});

app.listen(port, function(){
    var datetime = new Date();
    var message = "server running on port:" + port+ "started at: " + datetime;
    console.log(message);
});