import express from "express";
import { config } from "dotenv";
import authRouter from "./routes/auth.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleTokenStrategy } from "passport-google-token";
import { Strategy as LocalStrategy } from "passport-local"; 
import { googleStrategyHandler } from "./controllers/auth.js";
import session from "express-session";
import { User } from "./models/user.js";

export const app = express();
config();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, googleStrategyHandler));

passport.use(new LocalStrategy({
    usernameField: 'email', // assuming your login form sends 'email' and 'password'
    passwordField: 'password'
  }, ));

//using routes
app.use("/api/auth", authRouter);

app.get('/', (req, res) => {
    res.send('Welcome to Be My Eyes Explo Server');
});

app.use(errorMiddleware);
