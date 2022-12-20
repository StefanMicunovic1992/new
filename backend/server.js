const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesURL = require('./routes/routes')
const cors = require('cors')

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS)
    .then(()=>console.log('connection successfull on database'))
    .catch((error) => console.log(error))

app.use(express.json())
app.use(cors());
app.use('/app', routesURL)



app.listen(5000, () => console.log('server working'))