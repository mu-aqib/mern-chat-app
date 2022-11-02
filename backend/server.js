const express = require('express'); 
const dotenv = require('dotenv');
const dbConnection = require('./config/db');

// routes
const useUserRoute = require('./routes/userRoutes')
const useChatRoute = require('./routes/chatRoute')
const useMessage = require('/routes/messageRoute')
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
app.listen(5000, console.log("now server has been started on port " + PORT)) 