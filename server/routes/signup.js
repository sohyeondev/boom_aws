//회원가입 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");
const crypto = require('crypto');

router.post('/', (req, res) =>{

    if(req.body.state === "signup") {
        var name = req.body.name //클라이언트에서 받아오는 값
        var email = req.body.email
        var pw = req.body.pw
        var code = req.body.code
        var today = req.body.today
        const salt = crypto.randomBytes(128).toString('base64');
        const hashPW = crypto.createHash('sha512').update(pw + salt).digest('hex');

        mysql.query("SELECT * FROM companys WHERE code = ?",
        [code],
        function(error, result2){
            if(!error) {
                if(result2[0] !== undefined) {
                    var company = result2[0].name
                    var department = result2[0].department
                    mysql.query("SELECT * FROM users WHERE email = ?",
                    [email],
                    function(error, result){
                        if(!error) {
                            if(result[0]==undefined){
                                mysql.query('INSERT INTO users(name, email, pw, salt, company, department, created_at) VALUES(?, ?, ?, ?, ?, ?, ?);',
                                [name, email, hashPW, salt, company, department, today],
                                function(error, result){
                                    if(!error){
                                        res.json({ message: true }) //클라이언트에 전달
                                    } else {
                                        res.json({ message: false })
                                        console.log("서버 INSERT 오류 : " + error)
                                    }
                                });
                            }
                            else if(result[0]){
                                res.json({ message: "dup" })
                            }
                        } 
                        else {
                            console.log("서버 SELECT 오류 : " + error)
                        }
                    })
                } else {
                    res.json({ message: "noCode"})
                }
            } else {
                console.log("code : "+error)
            }
        }) 
    } else if(req.body.state === 'resDID') {
        var email = req.body.email
        var did = req.body.did
        var verkey = req.body.verkey
        console.log("email : "+email+" did : "+did+" verkey : "+verkey);
        mysql.query('UPDATE users SET did=?, verkey=? WHERE email=?;', [did, verkey, email])
    } else {
        console.log('state 없음')
    }

});

// 라우터를 모듈화
module.exports= router;