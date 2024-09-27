import { Role } from "../Models/Role.model.js";

const createRole = async(req, res , next) =>{
    try {
           if(req.body.role && req.body.role !== ' '){
            const newRole = new Role(req.body);
            await newRole.save();
            return res.status(201).send("Role created");
           }else{
            return res.status(400).send("Bad Requset");
           }
    } catch (error) {
        return res.status(500).send("Internal Server Error!");
    }
}


const updateRole = async(req,res,next) =>{
     
    try {
        const role = await Role.findById({_id:req.params.id});
        if(role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            );
            return res.status(200).send("Role Updated")
        }else{
            return res.status(400).send("Role Not Found");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error!")
    }
}
const getAllRoles = async(req,res,next)=>{
    try {
           const role = await Role.find({});
           return res.status(200).send(role);
    } catch (error) {
        return res.status(500).send("Internal Server Error!")
    }
}
const deleteRole = async(req,res,next)=>{
       try {
             const roleID = req.params.id;
             const role = await Role.findById({_id:roleID})
             if(role){
                await Role.findByIdAndDelete(roleID);
                return res.status(200).send("role is deleted");
             }else{
                return res.status(404).send("role not found");
             }
       } catch (error) {
        return res.status(500).send("Internal Server Error!")
       }
}
export  {createRole,updateRole,getAllRoles,deleteRole};