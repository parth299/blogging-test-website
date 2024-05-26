import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/model/User";
import bcrypt from 'bcryptjs'

dbConnect();

export async function POST(request) {
    try {
        const {username, email, password} = await request.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        newUser.save();

        return NextResponse.json({
            message: "User created Successfully",
            user: newUser
        },{status: 200});

    } catch (error) {
        console.log("some error occured");
        return NextResponse.json({
            message: "Cannot create user"
        }, {status: 500});
    }
}