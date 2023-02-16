require('dotenv').config();
require('./src/backgroundJobs/getMovies.cornJobs')
require('./src/backgroundJobs/upComing.cornJobs')

const express = require('express');
const mongoose = require('mongoose');
const { router: AuthRouter } = require('./src/routes/Auth.routes');
const { router: MoviesRouter } = require('./src/routes/Movies.routes');
const { router: NotificationRouter } = require('./src/routes/Notification.routes');

var cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app)
const { Server } = require('socket.io');
const socketConnection = require('./src/backgroundJobs/reminderNotfiy.cornJobs');
const io = new Server(server, { cors: { origin: '*' } });

socketConnection(io);

const PORT = process.env.PORT || 3000;

app.use(cors())


const mongoString = process.env.DATABASE_URL;

mongoose.set('strictQuery', false);
mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());

app.use('/api/user', AuthRouter)
app.use('/api/movies', MoviesRouter)
app.use('/api/notifications', NotificationRouter)
app.all('*', (req, res) => {
    res.send('not found any route ')
})



server.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

// module.exports =  {io} ;