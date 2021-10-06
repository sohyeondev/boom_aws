//회원가입 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");
const crypto = require('crypto');

router.post('/', (req, res) =>{

    if(req.body.state === "myPage") {
        var email = req.body.email
        mysql.query("SELECT * FROM users WHERE email = ?",
        [email],
        function(error, result){
            if(!error) {
                res.json({
                    name: result[0].name,
                    email: result[0].email,
                    company : result[0].company,
                    department : result[0].department,
                    did: result[0].did
                })
            } 
            else {
                console.log("서버 myPage 오류 : " + error)
            }
        }) 
    }else if(req.body.state === "changePW"){
        var email = req.body.email
        var nowPW = req.body.nowPW
        var newPW = req.body.newPW
        const salt = crypto.randomBytes(128).toString('base64');
        const hashPW = crypto.createHash('sha512').update(newPW + salt).digest('hex');
        mysql.query("SELECT pw,salt FROM users WHERE email=?",
        [email],
        function(error, result){
            if(!error){
                var dbPW = result[0].pw
                var dbSalt = result[0].salt
                var hashNowPW = crypto.createHash('sha512').update(nowPW + dbSalt).digest('hex');
                if(dbPW == hashNowPW){
                    mysql.query("UPDATE users SET pw=?, salt=? WHERE email=?",
                    [hashPW, salt, email],
                    function(error, result){
                        if(!error){
                            res.json({message: "change"})
                        }else{
                            res.json({message: "notChange"})
                        }
                    })
                }else{
                    res.json({message: "isNotPW"})
                }
            }
        })
    }else {
        console.log('state 없음')
    }

});

// 라우터를 모듈화
module.exports= router;