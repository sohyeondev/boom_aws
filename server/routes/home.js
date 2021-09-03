//로그인 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");
const crypto = require('crypto');

router.post('/', (req, res) =>{

    var loginEmail = req.body.loginEmail  //클라이언트에서 받아오는 값
    var loginPW = req.body.loginPW

    mysql.query('SELECT email, pw, salt FROM users', 
        function(error, result){
            if(!error){
                for (var i=0; i<result.length; i++) {
                    if(loginEmail === result[i].email) {
                        var userSalt = result[i].salt
                        const hashLoginPW = crypto.createHash('sha512').update(loginPW + userSalt).digest('hex');
                        if(hashLoginPW === result[i].pw) {
                            return res.json({ message: true }) //클라이언트에 전달
                        }
                        else {
                            return res.json({ message: false})
                        }
                    }
                }
                return res.json({message: "notUser" })
            } else {
                console.log("서버 오류 : "+error)
            }
        });

});
// 라우터를 모듈화
module.exports= router;