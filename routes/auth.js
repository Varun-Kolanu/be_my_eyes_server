import express from "express";
import { googleAuthHandler } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post('/google', passport.authenticate('google-token'), googleAuthHandler);
router.post('/login', passport.authenticate('local'), localAuthHandler);

export default router;