import express from "express";
import {json} from "body-parser";
import  Consola  from "consola";
import cors from "cors";
import  Mongoose  from "mongoose";

// import  Application  constants
import { DB , PORT} from "./constants";


// Router Exports
import userApis from "./apis/users"
// initialize express Application
const app = express();

// aplly application middleware
app.use(cors());
app.use(json());

// inject Sub router and Apis
app.use('/users',userApis)

const main = async () =>{
    try {
        // connect with database
        await mongoose.connect (DB,{
           useUnifiedTopology : true,
           useFindAndModify : false,
           useNewUrlParser : true
        });
        
        consola.success("Database Connected Successfully");
        // Start application listening request on server
        app.listen(PORT ,()=> consola.success(`server started on port ${PORT} `))
    } catch (error) {
        
    }
};

main();