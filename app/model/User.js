import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    blogs: [
        {
            title: { type: String, required: true },
            content: { type: String, required: true },
            createdAt: {type: Date, required: true, default: Date.now}
        }
    ],
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    token: String,
    tokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model('User', userSchema);


export default User;