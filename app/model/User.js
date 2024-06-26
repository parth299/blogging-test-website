import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
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
    verifyCode: {
        type: String
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    token: String,
    tokenExpiry: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);


export default User;