import express from "express";
import { authHandler, deleteAccount, mainScreenProfile, registerHandler, updateProfile } from "../controllers/auth.js";
import passport from "passport";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/google', passport.authenticate('google-token'), authHandler);
router.post('/login', passport.authenticate('local'), authHandler);
router.post('/register', registerHandler);
router.patch('/',isAuthenticated, updateProfile );
router.get('/main_screen_profile', isAuthenticated, mainScreenProfile);
router.route('/').patch(isAuthenticated, updateProfile).delete(isAuthenticated, deleteAccount);

export default router;