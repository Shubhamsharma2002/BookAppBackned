import { Role } from "../Models/Role.model.js"
import { User } from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../Utils/ApiSucess.js";
import ApiError from "../Utils/ApiError.js";
import jwt from "jsonwebtoken";
import UserTokenModel from "../Models/UserToken.model.js";
import nodemailer from "nodemailer";
// rigestration controller
export const createUser = async(req, res , next) =>{
    try {
        const role = await Role.find({role:'User'});
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username:req.body.username,
            email : req.body.email,
            fullname:req.body.fullname,
            password:hashpassword,
            roles:role
    
        })
        await newUser.save();
        return res.status(200)
        .json(
            new ApiResponse(
                200,
                {newUser},
                "user regestred"
            )
        )
    } catch (error) {
        throw new ApiError(500,'something went wrong while registring')
    }
}
// login contolerr
export const checkUser = async(req, res ,next) =>{
    try {
        const user = await User.findOne({email:req.body.email}).populate("roles","role");
        const{roles} = user;
        if(!user){
            throw new ApiError(404,"User not found")
        
        }
        const ispassword = await bcrypt.compare(req.body.password , user.password);
        if(!ispassword) {
               return next( new ApiError(400,'invalid password'))
        }
        const token = jwt.sign(
            {id:user._id,isAdmin:user.isAdmin, roles:roles },
            process.env.JWT_SECERET
        )
        const option = {
            httpOnly:true,
            secure:true
        }
        return res.status(200)
        .cookie("accessToken", token,option)
        .json(
            new ApiResponse(
                200,
                {user},
                "user loged in Sucessfully"
            )
        )

    
    } catch (error) {
        throw new ApiError(500,error, 'something went wrong')
    }
}
// admin controller 

export const createAdmin = async(req, res , next) =>{
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password,salt)
        const Admin = new User({
            username:req.body.username,
            email : req.body.email,
            fullname:req.body.fullname,
            password:hashpassword,
            roles:role,
            isAdmin:true,
    
        })
        await Admin.save();
        return res.status(201).json(
            new ApiResponse(200, Admin,"User Register suceesfully")
         )
    } catch (error) {
        console.log(error)
        throw new ApiError(500,'something went wrong while registring')
    }
}
// mail controller to send the mail
export const SendEmail = async (req,res,next)=>{
     const email = req.body.email;
     const user = await User.findOne({email:{$regex:'^' +email+'$', $options:'i'}});
     if(!user){
        throw next(new ApiError(404,"User not found with this email"))
     }
     const payload = {
        email:user.email
     }
     const expiryTime = 300
     const token = jwt.sign(payload,process.env.JWT_SECERET,{expiresIn:expiryTime});

     const newToken = new UserTokenModel({
           userID:user._id,
           token:token
     })


     let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "chatusteam@gmail.com",
          pass: "lwoxljoqzgobtgju",
        },
      });

      let mailOptions = {
        from: "chatusteam@gmail.com",
        to: email,
        subject: "Forget Password Mail",
        html:`
        
       <html>
    <head>
        <title>Reset Password</title>

    </head>
    <body>
        <h1>Password Reset Requset</h1>
        <p>Dear ${user.username},</p>
        <p>we have recived a request to reset the password for your account with BookMyBook to reset the passsword click the button below</p>
        <a href=${process.env.LIVE_URL}/reset/${token}>
          <button style="background-color: #4caf50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px; ">Reset Password</button>
        </a>
        <p>*Please note that link is only valid for 5 min</p>
        <p>Thanku By Shubham Sharma</p>
    </body>
</html>
        
        `
      };

      transporter.sendMail(mailOptions,  async(error, info) =>{
        if (error) {
          console.log(error);
            throw next(new  ApiError(500,'something went wrong while sending the mail'));
        } else {
            await newToken.save();
            return res.status(201).json(
                new ApiResponse(200,"mail send suceesfully")
             )
        }
      });
}

// reset password controller
export const resetPassword = async (req,res,next) =>{
       const token = req.body.token;
       const newPassword = req.body.password;
       jwt.verify(token,process.env.JWT_SECERET, async(err,data)=>{
        if(err){
            return next(new ApiError(500,'Reset Link is expired'))
        }else{
            const response = data;
            const user = await User.findOne({email:{$regex:'^' +response.email+'$', $options:'i'}});
            const salt = await bcrypt.genSalt(10);
            const encryptPassword = await bcrypt.hash(newPassword,salt);
            user.password=encryptPassword
            try {
                 const updatedUser = await User.findOneAndUpdate(
                    {_id:user._id},
                    {$set:user},
                    {new:true}
                 )
                 return res.status(201).json(
                    new ApiResponse(200,"password updated suceesfully")
                 )
            } catch (error) {
                return next(new ApiError(500,'something went wrong while resting the password '))
            }
        }
       })
}