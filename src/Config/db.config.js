// MONGODB CONNECTION CONFIGURATION USING MONGOOSE
const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.on('connected', () => {
        console.log("Database is connected");
    });
    mongoose.connection.on('error', (error) => {
        console.log(error);
    });
}

module.exports = { connect: connectDB };