var mysql= require("mysql");
// DB 설정정보
var connection = mysql.createConnection({
    host: 'boomtest.c5agrdksftaw.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password : 'admin2021',
    database : 'boomting',
    port: "3306",
});

module.exports= connection;