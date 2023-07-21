import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import morgan from "morgan";
import dbConnection from "./database/dbConnection.js";
import { init } from './src/modules/index.routes.js';
dotenv.config()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())    
app.use(express.static('uploads'))
app.use(morgan('dev'))

if(process.env.MODE=="development"){
    app.use(morgan('dev'))
}

init(app)
dbConnection()
app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))
process.on('unhandledRejection',err=>{
console.log('unhandedRejection',err);
})