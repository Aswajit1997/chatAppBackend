import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';

const app=express();
app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:['GET','POST']
    }
})

io.on("connection",(socket)=>{
    // console.log(socket.id,'backend');
    socket.on("joinRoom",room=>socket.join(room));

    socket.on("newMessage",({newMessage,room})=>{
        console.log(room,newMessage);
        io.in(room).emit('getLatestMessage',newMessage);
    })
})

app.get('/',(req,res)=>{
    res.send("hello from server");
});

server.listen(8000,()=>{
    console.log(`server running on port 8000`);
})