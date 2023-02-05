const CreateNewError = require('../middlewares/errorHandling.js');
const User = require('../models/User.js');

const UserController = {
    UpdateUser: async (req, res, next) => {
        if (req.params.id === req.user.id) {
            const { name, email } = req.body;
            try {
                const updateUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: { name, email }
                }, { new: true })
                res.status(200).json(updateUser);
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are only Update your Account"));
        }

    },
    DeleteUser: async (req, res, next) => {
        if (req.params.id === req.user.id) {
            try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({ message: "User Has been Deleted" });
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are only Delete your Account"));
        }

    },
    GetUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return next(CreateNewError(404, "Not Found"));
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (error) {
            return next(error);
        }
    },
    MakePublic: async (req, res, next) => {
        if (req.params.userId === req.user.id) {
            try {
                const user = await User.findByIdAndUpdate(req.user.id, {
                    $set: { isPublic: true }
                }, { new: true })
                const { password, updatedAt, ...other } = user._doc;
                res.status(200).json({ message: "API Successfully Generated!", other });
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are only Update your User"));
        }
    },
    ChangeTemplate: async (req, res, next) => {
        if (req.params.userId === req.user.id) {
            try {
                const user = await User.findByIdAndUpdate(req.user.id, {
                    $set: { template: req.body.template }
                }, { new: true })
                const { password, updatedAt, ...other } = user._doc;
                res.status(200).json({ message: "Template Changed Successfully!", other });
            } catch (error) {
                return next(error);
            }
        } else {
            return next(CreateNewError(403, "You are only Update your User"));
        }
    },
}
module.exports = UserController;