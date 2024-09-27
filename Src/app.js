import express from 'express';

import 'dotenv/config';
import router from './Routes/Role.routes.js';
import Authrouter from './Routes/Auth.routes.js';
import cookieparser from'cookie-parser'
import cors from "cors";
const server = express();




server.use(express.json());
server.use(cookieparser())
server.use(express.urlencoded());
server.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
server.use("/api/v1/role", router)
server.use("/api/v1/user", Authrouter)



export  {server};