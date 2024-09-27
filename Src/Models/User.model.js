import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avtar:{
            type:String,
            required:false,
            default:"https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?t=st=1727295834~exp=1727299434~hmac=500d544c9cc8b73b47171f9ac3eb62329749de4d02cf3b78f85e8d294b57e502&w=740s"
           
        },
       
        password:{
            type:String,
            required:[true,'password is required']
        },
      
        isAdmin:{
            type:Boolean,
            default:false
        },
        roles:{
            type:[Schema.Types.ObjectId],
            required:true,
            ref:"Role"
        }

    },{
        timestamps:true
    }

)

export const User = mongoose.model("User", userSchema);