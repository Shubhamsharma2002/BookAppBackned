import { Router } from "express";
import {createRole, deleteRole, getAllRoles, updateRole} from '../Controller/Role.controller.js'

const Rolerouter = Router();

Rolerouter.route("/create").post( createRole);
Rolerouter.route("/update/:id").put(updateRole);
Rolerouter.route("/getAll").get(getAllRoles);
Rolerouter.route("/delete/:id").delete(deleteRole)


export default Rolerouter;