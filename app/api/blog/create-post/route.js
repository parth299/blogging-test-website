import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/model/User";

dbConnect();

export async function POST(request) {
    try {
        const {title, content} = await request.json();

        // TODO:

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {status: 400});
    }
}