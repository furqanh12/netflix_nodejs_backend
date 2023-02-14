require('dotenv').config();
require('./src/backgroundJobs/getMovies.cornJobs')
require('./src/backgroundJobs/upComing.cornJobs')
require('./src/backgroundJobs/reminderNotfiy.cornJobs')

const express = require('express');
const mongoose = require('mongoose');
const AuthRouter = require('./src/routes/Auth.routes').router;
const MoviesRouter = require('./src/routes/Movies.routes').router;
var cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

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

app.use('/api/user',AuthRouter)
app.use('/api/movies',MoviesRouter)
app.all('*',(req,res)=>{
    res.send('not found any route ')
})

io.on('connection', (socket) => {
    console.log('A user connected');
    // socket.emit('new release movie notification',{title:'The Lion King'});
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

module.exports = { io };