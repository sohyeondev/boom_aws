var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const port = 3001;
const cors = require("cors");
var bodyparser = require("body-parser");

var mysql = require("./routes/mysql");

app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
mysql.connect();
app.use(express.static(__dirname + "./routes"));

var home = require("./routes/home");
var signup = require("./routes/signup");
var meetingUp = require("./routes/meetingUp");

app.use("/", home); // 홈(로그인)
app.use("/signup", signup); // 회원가입
app.use("/meetingUp", meetingUp);

/* ------ CREATING AND JOINING ROOMS FOR CONNECTION BETWEEN USERS ------ */

// room object to store the created room IDs
const users = {};
const socketToRoom = {};
const userList = {};
let userNames = [];

// when the user is forming a connection with socket.io
io.on("connection", (socket) => {
  console.log("on connection");
  // handling Group Video Call
  socket.on("join room group", (roomID) => {
    console.log("on join room group");
    // getting the room with the room ID and adding the user to the room
    if (users[roomID]) {
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }

    // returning new room with all the attendees after new attendee joined
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
    socket.emit("all users", usersInThisRoom);
    console.log(`emit all users ${usersInThisRoom}`);
  });

  socket.on("send user name", (username) => {
    if (users[socket.id]) {
      userList[socket.id].push(username);
    } else {
      userList[socket.id] = username;
    }

    userNames = Object.values(userList);

    socket.emit("send user list", userNames);
    console.log(`userList : ${userNames}`);
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message, userList[socket.id]);
  });

  // sending signal to existing members when user join
  socket.on("sending signal", (payload) => {
    console.log("on sending signal");
    io.to(payload.userToSignal).emit(
      "user joined",
      {
        signal: payload.signal,
        callerID: payload.callerID,
      },
      userNames
    );
    console.log("emit user joined");
  });

  // signal recieved by the user who joined
  socket.on("returning signal", (payload) => {
    console.log("on returning signal");
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
    console.log("emit receiving returned signal");
  });

  // handling user disconnect in group call
  socket.on("disconnect", () => {
    console.log("on disconnect");
    // getting the room array with all the participants
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    console.log(`room : ${room}`);

    if (room) {
      // finding the person who left the room
      // creating a new array with the remaining people
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }

    for (let id in userList) {
      if (id === socket.id) {
        delete userList[id];
      }
    }

    userNames = Object.values(userList);

    // emiting a signal and sending it to everyone that a user left
    socket.broadcast.emit("user left", socket.id, userNames);
    console.log(`남은 유저 :  ${userNames} `);
  });
});

server.listen(port, () => {
    console.log(`Example app listening at https://boompro.ml:${port}`)
})