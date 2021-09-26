//로그인 서버
var express = require("express");
var router = express.Router(); 
var mysql= require("./mysql");
const crypto = require('crypto');

router.post('/', (req, res) =>{
    console.log('test002');
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

router.post('/signup', (req, res) =>{ 
    console.log('request start111');
    // if(req.body.state === "signup") {
    //     var name = req.body.name //클라이언트에서 받아오는 값
    //     var email = req.body.email
    //     var pw = req.body.pw
    //     var userSalt = salt

    //     const hashPW = crypto.createHash('sha512').update(pw + salt).digest('hex');

    //     mysql.query("SELECT * FROM users WHERE email = ?",
    //     [email],
    //     function(error, result){
    //         if(!error) {
    //             if(result[0]==undefined){
    //                 mysql.query('INSERT INTO users(name, email, pw, salt) VALUES(?, ?, ?, ?);',
    //                 [name, email, hashPW, userSalt],
    //                 function(error, result){
    //                     if(!error){
    //                         res.json({ message: true }) //클라이언트에 전달
    //                     } else {
    //                         res.json({ message: false })
    //                         console.log("서버 INSERT 오류 : " + error)
    //                     }
    //                 });
    //             }
    //             else if(result[0]){
    //                 res.json({ message: "dup" })
    //             }
    //         } 
    //         else {
    //             console.log("서버 SELECT 오류 : " + error)
    //         }
    //     }) 
    // } else if(req.body.state === 'resDID') {
    //     var email = req.body.email
    //     var did = req.body.DID
    //     var verkey = req.body.Verkey
    //     console.log("email : "+email+" did : "+did+" verkey : "+verkey);
    //     mysql.query('UPDATE users SET did=?, verkey=? WHERE email=?;', [did, verkey, email])
    // } else {
    //     console.log('state 없음')
    // }

});
// 라우터를 모듈화
module.exports= router;