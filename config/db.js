const mongoose = require('mongoose')
//get connection string from .env file
const connectionString = process.env.ATLASDBCONNECTION

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Connection Successfull");
    
}).catch(err=>{
    console.log("Database Connection Failed");
    console.log(err);
    
})