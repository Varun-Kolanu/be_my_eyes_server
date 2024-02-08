import express from "express";
import { authHandler, registerHandler } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post('/google', passport.authenticate('google-token'), authHandler);
router.post('/login', passport.authenticate('local'), authHandler);
router.post('/register', registerHandler);

export default router;