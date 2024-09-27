import { Router } from "express";

import { checkUser, createAdmin, createUser, resetPassword, SendEmail } from "../Controller/User.controller.js";


const Authrouter = Router();

Authrouter.route("/register").post(createUser)
Authrouter.route("/login").post(checkUser)
Authrouter.route("/admin-register").post(createAdmin)
Authrouter.route("/send-email").post(SendEmail)
Authrouter.route("/reset-password").post(resetPassword)
export default Authrouter;