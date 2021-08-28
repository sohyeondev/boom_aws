//로그인 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

router.post('/', (req, res) =>{

    var loginEmail = req.body.loginEmail  //클라이언트에서 받아오는 값
    var loginPW = req.body.loginPW

    mysql.query('SELECT email, pw FROM users', 
        function(error, result){
            if(!error){
                for (var i=0; i<result.length; i++) {
                    if(loginEmail == result[i].email) {
                        if(loginPW == result[i].pw) {
                            return res.json({ message: true }) //클라이언트에 전달
                        }
                    }
                }
                return res.json({ message: false })
            } else {
                console.log(error)
            }
        });

});
// 라우터를 모듈화
module.exports= router;