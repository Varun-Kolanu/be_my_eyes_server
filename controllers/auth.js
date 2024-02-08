import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendJwt } from "../utils/sendJwt.js";
import bcrypt from "bcrypt";


export const googleStrategyHandler = async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile._json.email });
        if (user) return done(null, user);
        user = User.create({
            name: profile._json.name,
            email: profile._json.email,
            googleId: profile.id
        })
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}

export const authHandler = (req, res, next) => {
    try {
        if (!req.user) return next(new ErrorHandler("Error authenticating user", 401));
        const value = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);
        sendJwt(req.user, res, 200);
    } catch (error) {
        next(error);
    }
}

export const registerHandler = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400));
        if (password.length < 8) return next(new ErrorHandler("Password must me greater than 8 characters", 400));
        const hashedPwd = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPwd });
        sendJwt(user, res, 200);
    } catch (error) {
        next(error);
    }
}

export const localAuthStrategy = async (email, password, done) => {
    try {
        const user = await User.findOne({ email }).select("+password");
        if (user && (user.googleId || user.facebookId)) return done(null, null);
        if (!user || !bcrypt.compareSync(password, user.password)) return done(null, null);

        return done(null, user);
    } catch (error) {
        next(error);
    }
}