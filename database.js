const mongoose = require("mongoose");

const connectDB = async () => {
    const url = process.env.DB_URL;
    mongoose.set("strictQuery", false);

    await mongoose.connect(`${url}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
};

module.exports = connectDB;