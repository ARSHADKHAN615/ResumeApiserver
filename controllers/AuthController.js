const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const CreateNewError = require('../middlewares/errorHandling.js');
const jwt = require('jsonwebtoken');
const Resume = require('../models/ResumeData.js');


const AuthController = {
    usernameExist: async (req, res, next) => {
        try {
            const name = req.params.username;
            const user = await User.findOne({ name });
            if (user) return next(CreateNewError(400, "Username Not available"));
            res.status(200).json({ message: "Username available" });
        } catch (error) {
            next(error);
        }
    },
    emailExist: async (req, res, next) => {
        try {
            const email = req.params.email;
            const user = await User.findOne({ email });
            if (user) return next(CreateNewError(400, "Email Already Exist"));
            res.status(200).json({ message: "Email Not Exist" });
        } catch (error) {
            next(error);
        }
    },
    signUp: async (req, res, next) => {
        try {
            const { name, email, password, img } = req.body;
            // check user name and email exist
            const user = await User.findOne({ $or: [{ name }, { email }] });
            if (user) return next(CreateNewError(400, "Username or Email Already Exist"));

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const newUser = new User({
                name, email, password: hashPassword, img
            });
            await newUser.save();
            // create resume
            const newResume = new Resume({
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
            });
            await newResume.save();

            res.status(200).json({ message: "User Created" });
        } catch (error) {
            next(error);
        }
    },
    signIn: async (req, res, next) => {
        try {
            const { name } = req.body;
            // check user
            const user = await User.findOne({ name });
            if (!user) return next(CreateNewError(404, "User Not Founds"));

            // check password
            const isCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isCorrect) return next(CreateNewError(400, "Wrong Password"));

            // create token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const { password, ...others } = user._doc;
            // and expire in 10 seconds
            res.cookie("access_token", token, {
                httpOnly: true,
                // expires: new Date(Date.now() + 10 * 1000),
                secure: true,
                sameSite: "none",
            }).status(200).json(others);
            // next();
        } catch (error) {
            next(error);
        }
    },
    getAuthUser: async (req, res, next) => {
        try {
            const AuthUser = await User.findById(req.user.id);
            if (!AuthUser) return next(CreateNewError(404, "User Not Found"));
            const { password, updatedAt, ...other } = AuthUser._doc;
            res.status(200).json(other);
        } catch {
            return next(error);
        }
    },
    googleSignIn: async (req, res, next) => {
        try {
            const { name, email, img } = req.body;
            // check user
            const user = await User.findOne({ email });
            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                const { password,isPublic, ...others } = user._doc;
                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                }).status(200).json(others);
            } else {
                const newUser = new User({
                    name, email, img, formGoogle: true
                });
                await newUser.save();
                // create resume
                const newResume = new Resume({
                    userId: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    image: newUser.img
                });
                await newResume.save();

                const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
                const { password, ...others } = newUser._doc;
                res.cookie("access_token", token, {
                    httpOnly: true,
                    // secure: true,
                    sameSite: "none",
                }).status(200).json(others);
            }
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        res.clearCookie("access_token", { path: '/' })
        res.status(200).json({ message: "Logout Successfully" });
    },

}
module.exports = AuthController;