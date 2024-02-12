import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        select: false
    },
    googleId: {
        type: String
    },
    role: {
        type: String,
        enum: ['blind', 'volunteer']
    },
    language: {
        type: String,
        enum: ['English', 'Hindi', 'Telugu', 'Marathi']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("User", userSchema);