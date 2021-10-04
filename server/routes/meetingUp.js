//회원가입 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

router.post('/', (req, res) =>{

    if(req.body.state === "meetingUp") {
        var email = req.body.email
        mysql.query("SELECT company,department FROM users WHERE email = ?",
        [email],
        function(error, result){
            if(!error) {
                res.json({
                    company : result[0].company,
                    department : result[0].department
                })
            } 
            else {
                console.log("서버 meetingUp 오류 : " + error)
            }
        }) 
    } else {
        console.log('state 없음')
    }

});

// 라우터를 모듈화
module.exports= router;