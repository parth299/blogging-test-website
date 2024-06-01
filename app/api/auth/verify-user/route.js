import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(request) {
    try {
        const {userid, otp} = await request.json();
        console.log(userid)
        const user = await User.findOne({username: userid});

        if(!user) {
            return Response.json({
                success: false,
                message: "User is not created!"
            }, {status: 404})
        }

        // User is present check its otp
        const isCodeCorrect = user.verifyCode === otp
        if(isCodeCorrect && user) {
            user.isVerified = true
            await user.save();
        }

        return Response.json({
            success: true,
            message: "User verified successfully"
        }, {status: 200})
        
    } catch (error) {
        return Response.json({
            success: false,
            message: "User verification failed!"
        }, {status: 500})
    }
}