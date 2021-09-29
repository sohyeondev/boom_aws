//회원가입 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");
const crypto = require('crypto');
const salt = crypto.randomBytes(128).toString('base64');

router.post('/', (req, res) =>{

    if(req.body.state === "signup") {
        var name = req.body.name //클라이언트에서 받아오는 값
        var email = req.body.email
        var pw = req.body.pw
        var userSalt = salt

        const hashPW = crypto.createHash('sha512').update(pw + salt).digest('hex');

        mysql.query("SELECT * FROM users WHERE email = ?",
        [email],
        function(error, result){
            if(!error) {
                if(result[0]==undefined){
                    mysql.query('INSERT INTO users(name, email, pw, salt) VALUES(?, ?, ?, ?);',
                    [name, email, hashPW, userSalt],
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
    } else if(req.body.state === 'resDID') {
        var no = req.body.no
        var did = req.body.did
        var verkey = req.body.verkey
        console.log("no : "+no+" did : "+did+" verkey : "+verkey);
        mysql.query('UPDATE users SET did=?, verkey=? WHERE no=?;', [did, verkey, no])
    } else {
        console.log('state 없음')
    }

});

// 라우터를 모듈화
module.exports= router;