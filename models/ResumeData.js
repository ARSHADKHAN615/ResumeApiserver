const mongoose = require("mongoose");

const ResumeDataSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    designation: { type: String },
    bio: { type: String },
    website: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    objective: { type: String },
    skills: { type: [String] },
    education: [{ degree: { type: String }, institution: { type: String }, marks: { type: String }, duration: { type: [Date] } }],
    social: [{ link: { type: String }, name: { type: String } }],
    experience: [{ company: { type: String }, position: { type: String }, duration: { type: [Date] }, description: { type: String }, status: { type: String } }],
    frontEnd: [{ name: { type: String }, liveLink: { type: String }, githubLink: { type: String } , description: { type: String } }],
    fullStack: [{ name: { type: String }, liveLink: { type: String }, githubLink: { type: String } , description: { type: String } }],
    courses: [{ name: { type: String }, certificate: { type: String }, organization: { type: String } }],
    techStack: [{ name: { type: String }, reference: { type: String }, description: { type: String } }],
    languages: [{ name: { type: String }, level: { type: String } }],

}, { timestamps: true });

module.exports = mongoose.model("ResumeData", ResumeDataSchema);