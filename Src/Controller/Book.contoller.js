
import  Book  from "../Models/Book.model.js";
import ApiError from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiSucess.js";


const gettheBook = async(req, res , next) =>{
    try {
         const books = await Book.find();
         return res.status(200)
         .json(
             new ApiResponse(
                 200,
                 books,
                 "all boos fetched"
             )
         )
    } catch (error) {
        throw new ApiError(500,'internal server error')
    }
}

export default gettheBook;