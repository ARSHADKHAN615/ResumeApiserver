const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required:[true, "Username is required"], unique:[true, "Username is already taken"] },
    email: { type: String, required: [true, "Email is required"], unique: [true, "Email is already taken"] },
    password: { type: String },
    img: { type: String },
    formGoogle: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    template: { type: String, default: "1" },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);