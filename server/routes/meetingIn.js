//회원가입 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

router.post('/', (req, res) =>{

    if(req.body.state === "meetingIn") {
        var email = req.body.email
        var company = req.body.company
        var department = req.body.department
        console.log("company : "+company)
        console.log("department : "+department)
        mysql.query("SELECT company,department FROM users WHERE email = ?",
        [email],
        function(error, result){
            if(!error) {
                if(result[0].company !== company || result[0].department !== department) {
                    res.json({
                        message : "dissatisfaction"
                    })
                } else {
                    res.json({
                        message : "satisfaction"
                    })
                }
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