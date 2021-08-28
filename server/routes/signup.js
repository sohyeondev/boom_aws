//회원가입 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

router.post('/', (req, res) =>{

    var name = req.body.name //클라이언트에서 받아오는 값
    var email = req.body.email
    var pw = req.body.pw

    mysql.query('INSERT INTO users(name, email, pw) VALUES(?, ?, ?);',
    [name, email, pw],
    function(error, result){
        if(!error){
            mysql.query('SELECT * FROM users', function(error, result){
                if(!error) {
                    for (var i=0; i<result.length; i++) {
                        console.log(result[i])
                    }
                    return res.json({ message: true }) //클라이언트에 전달
                }
            })
        } else {
            res.json({ message: false })
            console.log(error)
        }
    });

});
// 라우터를 모듈화
module.exports= router;