var express = require("express"); 	
var app = express();
const port = 3001
const cors = require("cors");
var bodyparser = require('body-parser');

var mysql= require("./routes/mysql");

app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended : true  }));
mysql.connect();
app.use(express.static(__dirname+ "./routes"));

var home = require("./routes/home");
var signup = require("./routes/signup");

app.use('/',home); // 홈(로그인)
app.use('/signup',signup); // 회원가입

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})