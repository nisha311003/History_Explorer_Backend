require('dotenv').config();
const mongoose = require("mongoose");
console.log("MONGO_URI:", process.env.MONGO_URI); // This should print the MongoDB URI from the .env file

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected:", connect.connection.host, connect.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
module.exports = connectDb; 

// const mongoose = require("mongoose");

// const connectDb = async () => {
//   const mongoURI = process.env.MONGO_URI;

//   console.log("MONGO_URI:", mongoURI); // Helpful debug

//   try {
//     const connect = await mongoose.connect(mongoURI);
//     console.log("Database connected:", connect.connection.host, connect.connection.name);
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;

// const connectDb = async() =>{
//     try{
//         const connect = await mongoose.connect("mongodb://localhost:27017/credentials");
//         console.log("Database connected: ", connect.connection.host,connect.connection.name);

//     }catch(err){
//         console.log(err);
//         process.exit(1);
//     }
// };
// module.exports = connectDb;