const mongoose = require("mongoose");

const ConnectDB = async () => {
    try{
        await
        mongoose.connect(process.env.Mongo_Url);
        console.log("Connected to mongoDB");
    }catch(error) {
        console.log("Uanable to connected to mongoDB.");
        process.exit(1);
    };
}




module.exports = ConnectDB;