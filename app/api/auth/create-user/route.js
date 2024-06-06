import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/model/User";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/app/helpers/sendVerification";

dbConnect();

export async function POST(request) {
    try {
        const {username, email, password} = await request.json();

        const user = await User.findOne({username});
        if(user) {
            return NextResponse.json({
                success: false,
                message: "User with username already exists"
            }, {status: 404});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        //Create the verify code
        const verifyCode = String(Math.floor(Math.random()*900000 + 100000));
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verifyCode
        });

        if(!newUser) {
            return NextResponse.json({
                message: "Cannot create user"
            }, {status: 500});
        }


        await newUser.save();
        
        const data = {
            username,
            email,
            verifyCode
        }
        const response = await sendVerificationEmail(data);
        console.log(response);

        return NextResponse.json({
            message: "User created Successfully",
            user: newUser
        },{status: 200});

    } catch (error) {
        console.log("some error occured :: ", error);
        return NextResponse.json({
            message: "Cannot create user"
        }, {status: 500});
    }
}