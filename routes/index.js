const express = require('express');
const UserController = require('../controllers/UserController.js');
const verifyToke = require('../middlewares/authHandler.js');
const ResumeController = require('../controllers/ResumeController.js');
const router = express.Router();

//User Routes
const userPath = '/user';
router.put(`${userPath}/:id`, verifyToke, UserController.UpdateUser);
router.delete(`${userPath}/:id`, verifyToke, UserController.DeleteUser);
router.put(`${userPath}/make-public/:userId`, verifyToke, UserController.MakePublic);
router.put(`${userPath}/change-template/:userId`, verifyToke, UserController.ChangeTemplate);

//Resume Routes
const resumePath = '/resume';
router.put(`${resumePath}/:userId`, verifyToke, ResumeController.UpdateResume)
router.get(`${resumePath}/:userId`, verifyToke, ResumeController.GetResumeForEdit)
router.get(`/:username`, ResumeController.GetResumeForPublic);
router.get(`/template/:username`, ResumeController.GetResumeForResume);

module.exports = router;