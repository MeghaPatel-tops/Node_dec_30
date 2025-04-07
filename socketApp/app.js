const { log } = require('console');
var express = require('express');
var cors = require('cors')



const app = express();

const http = require('http');

const server = http.createServer(app);

const {Server} = require('socket.io');

const io = new Server(server);
app.use(cors());

io.on('connection', (socket)=>{
    console.log('New user connected');
    socket.on("send Msg",(msg)=>{
        console.log(msg);
        io.emit("res",msg);
     })
  });

 
  
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/chat.html");
})

server.listen(5000,()=>{
    console.log('running on 5000');
})