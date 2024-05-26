import mongoose, { connection } from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected Success");
    } catch (error) {
        console.log("Some error occured and database connection failed");
        process.exit(1);
    }
}