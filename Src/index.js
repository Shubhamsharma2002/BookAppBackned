
import 'dotenv/config';

import {server} from './app.js';
import connectDB from './Db/index.js';

const port = process.env.PORT || 8000;




server.listen(port, () =>{
       console.log(`server is fired sucessfully on port no ${port}`);
      
       connectDB();
})