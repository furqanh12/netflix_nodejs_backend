require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const {router} = require('./src/routes/Auth.routes')
var cors = require('cors');
const { request } = require('express');
const app = express();

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
app.use('/api/user',router)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})