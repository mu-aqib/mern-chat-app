const express = require('express'); 
const dotenv = require('dotenv');
const dbConnection = require('./config/db');

// routes
const useUserRoute = require('./routes/userRoutes')
const useChatRoute = require('./routes/chatRoute')
const useMessage = require('./routes/messageRoute')
const { notFound, errorHandler } = require('./middleware/errMiddleware')

dotenv.config();
dbConnection();

const app = express();
app.use(express.json())

// use routes 
app.use('/api/user', useUserRoute);
app.use('/api/chat', useChatRoute);
app.use('/api/message', useMessage)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
let server = app.listen(5000, console.log("now server has been started on port " + PORT)) 

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors:{
        origin: 'http://localhost:3000',
    },
});

io.on("connection", (socket)=>{
    console.log("backend connected with socket");

    // socket setup with loggedin user
    socket.on("setup", (LoggedUser)=>{
        socket.join(LoggedUser._id);
        socket.emit("connected")
    })

    // socket between looges and chated users
    socket.on('Chat_Conn', (chat_id)=>{
        socket.join(chat_id);
        console.log("user joined room " + chat_id)
    })
    // socket.on('new_chat', (chat)=>{
    //     console.log("user joined room with new chat " + chat)
    // })

    // new message socket to show notification that this usersend messages
    socket.on("new_Message", (newMsg)=>{
        // console.log("new_Message socket", newMsg)
        const {chat} = newMsg;
        console.log("new_Message socket", chat)

        chat.users.forEach(user => {
            if(user._id === newMsg.sender._id) return;
            // socket 'in' mean that inside user room send that message.
            socket.in(user._id).emit("message_recived", newMsg)
        });
    })
})