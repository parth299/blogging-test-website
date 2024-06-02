import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/model/User";
import jwt from 'jsonwebtoken'

dbConnect();

export async function POST(request){
    try {

        const {verifyCode, username, title, content} = await request.json();
        const token = verifyCode;
        
        if(!token) {
            return NextResponse.json({
                success: false,
                message: "Token not found"
            }, {status: 401})
        }
        
        const user = await User.findOne({username});
        console.log(user);
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User does not exists :: authMiddleware"
            }, {status: 404})
        }
        
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }})
            const isTokenExpired = user.tokenExpiry > Date.now()
            
            if(!isTokenExpired) {
                // Token is not expired
                return NextResponse.json({
                    sucess: false,
                    message: "Token is now expired!"
                }, {status: 404})  
            }
            
            const newBlog = {
                title,
                content,
                createdAt: new Date()
            }

            await user.blogs.push(newBlog);
            await user.save();
            
            return NextResponse.json({
                success: true,
                message: "Middleware working properly",
                title,
                content
            }, {status: 200})
            // TODO:

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {status: 400});
    }
}


