import ApiError from "../Utils/ApiError";
import jwt from "jsonwebtoken";
export const verifyToken = (req,res,next) =>{
    const Token = req.cookies.accessToken;
    if(!Token){
        return next(new ApiError(401,"you are not authenticated"));
    }
    jwt.verify(Token,process.env.JWT_SECERET,(err,user)=>{
        if(err){
            return next(new ApiError(403,"token is invalid"))
        }else{
            req.user = user;
        }
        next();
    })
}

export const verifyUser = (req, res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(new ApiError(403, "not authorized"));
        }
    })
}


export const verifyAdmin = (req, res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(new ApiError(403, "not authorized"));
        }
    })
}