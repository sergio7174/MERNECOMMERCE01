const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected successfully ${conn.connection.host}`.bgGreen.black);
    } catch (error) {
        console.log(error);
    }
} 

module.exports = connectDb;