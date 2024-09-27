import { Router } from "express";
import gettheBook from "../Controller/Book.contoller.js";

const Bookrouter = Router();


Bookrouter.route('/').get(gettheBook)

export default Bookrouter;