const CreateNewError = require('../middlewares/errorHandling.js');
const ResumeData = require('../models/ResumeData.js');
const User = require('../models/User.js');

const ResumeController = {
    UpdateResume: async (req, res, next) => {
        if (req.params.userId === req.user.id) {
            const { image, name, designation, bio, email, phone, address, education, experience, skills, social, frontEnd, fullStack, courses, techStack, languages } = req.body;
            let imageFiled = "";
            if (image.length === 2) {
                imageFiled = image[1].xhr;
            } else {
                imageFiled = image[0].url;
            }
            try {
                // update by user id
                const updateResume = await ResumeData.findOneAndUpdate({ userId: req.user.id }, { $set: { name, image: imageFiled, designation, bio, email, phone, address, education, experience, skills, social, frontEnd, fullStack, courses, techStack, languages } }, { new: true })
                res.status(200).json(updateResume);
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are only Update your Resume"));
        }

    },
    GetResumeForEdit: async (req, res, next) => {
        const userId = req.params.userId;
        if (userId === req.user.id) {
            try {
                const user = await User.findById(req.user.id);
                if (!user) return next(CreateNewError(400, "Username Not available"));
                const resume = await ResumeData.findOne({ userId: user._id });
                res.status(200).json(resume);
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are not allowed to see this Resume"));
        }
    },
    GetResumeForPublic: async (req, res, next) => {
        const username = req.params.username;
        try {
            const user = await User.findOne({ name: username, isPublic: true });
            if (!user) return next(CreateNewError(400, "Username Not available"));

            if (user.isPublic) {
                const resume = await ResumeData.findOne({ userId: user._id });
                res.status(200).json(resume);
            } else {
                return next(CreateNewError(403, "Access Denied!"));
            }
        } catch (error) {
            return next(error);
        }
    },
}
module.exports = ResumeController