import mongoose from "mongoose";
import { seedBooksData } from "../../seed.js";


const connectDB = async () =>{
      try {
    // console.log(`${process.env.URI}`);
    
       const connection =  await mongoose.connect(`${process.env.URI}/${process.env.DB_NAME}`)
        if(process.argv.includes("--seed")){
          await seedBooksData();
        }
        console.log(`databse connect ::)  ${connection}`);
        
      } catch (error) {
        console.log("mongo db connection error");
        console.log(error);

        
      }
}


export default connectDB;