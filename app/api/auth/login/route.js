import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/model/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

dbConnect();

export async function POST(request) {
    try {
        const {email, password} = await request.json();

        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User with email does not exist"
            }, {status: 401});
        }

        //User exists in db, check the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(isPasswordCorrect) {
            //Login success
            console.log("User is logged in successfully")
            const token = jwt.sign({username: user.username, email: user.email}, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })
            user.token = token;
            const date = new Date();
            user.tokenExpiry = date.getTime() + 3600000
            // console.log(tokenExpiry)

            await user.save();
            return NextResponse.json({
                success: true,
                message: "User logged in succesfully",
                token
            }, {status: 200})
        }
        else {
            console.log("Incorrect password :: Please check you password");
        }

    } catch (error) {
        console.log("Something went wrong while logging in :: ", error);
        return NextResponse.json({
            success: false,
            message: "Login failed"
        }, {status: 500});
    }
}