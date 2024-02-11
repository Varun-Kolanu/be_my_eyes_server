import mongoose from "mongoose";

const roleCountSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['blind', 'volunteer'],
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
})

export const RoleCount = mongoose.model("RoleCount", roleCountSchema);