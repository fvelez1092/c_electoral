import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import path = require('path');
import { Server } from "socket.io";
import {router} from './routes/auth_routes'
import {dbConnection} from './database/config'
//Seleccionamos el puerto

const port = process.env.PORT||3001
//DB Conection

dbConnection();

//Creamos el server de express
const app = express()

//parseo de los datos
app.use(express.json())

//configuracion de los cors
app.use(cors())

//Rutas

app.use('/api',router)

// Node Server
 const server = http.createServer(app);

 
 
 const io = new Server(server); 
 
// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


server.listen( process.env.PORT, () => {

     console.log('Server on port', port );

})

export {io};
