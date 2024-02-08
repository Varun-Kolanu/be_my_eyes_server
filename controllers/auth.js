import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";


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

export const googleAuthHandler = (req, res, next) => {
    try {
        if (!req.user) return next(new ErrorHandler("Error authenticating user", 401));
        const value = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ jwt: value });
    } catch (error) {
        next(error);
    }
}