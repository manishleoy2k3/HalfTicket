var sql = require("mssql/msnodesqlv8");

var connect = function()
{
    var config = {server: 'DAKSHESH\MSSQLSERVER01', database: 'TESTDB' };
    var conn = sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
    });
    return conn;
};

module.exports = connect;
