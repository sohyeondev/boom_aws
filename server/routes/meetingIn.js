//회원가입 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");

router.post('/', (req, res) =>{

    if(req.body.state === "meetingIn") {
        var email = req.body.email
        var path = req.body.path
        console.log(path)
        mysql.query("SELECT company,department FROM meeting WHERE path = ?",
        [path],
        function(error, result){
            var roomCompany = result[0].company
            var roomDepartment = result[0].department
            if(!error){
                mysql.query("SELECT company,department FROM users WHERE email = ?",
                [email],
                function(error, result){
                    if(!error) {
                        if(result[0].company !== roomCompany || result[0].department !== roomDepartment) {
                            res.json({
                                message : "dissatisfaction"
                            })
                        } else {
                            res.json({
                                message : "satisfaction",
                                company : result[0].company,
                                department : result[0].department
                            })
                        }
                    } 
                    else {
                        console.log("서버 meetingUp 오류 : " + error)
                    }
                }) 
            }
        })

    } else {
        console.log('state 없음')
    }

});

// 라우터를 모듈화
module.exports= router;