import { NextResponse, NextRequest } from "next/server";
import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/dbConnect";

dbConnect();

export async function GET(request) {
    try {
        const blogs = [
            {
                title: "NextJs: The full stack framework",
                content: "Nextjs can be used for handling both the frontend and the backend. A simple backend can be managed easily using the api directory inside the app direectory"
            },
            {
                title: "AuthJs : NextAuth changed to AuthJs",
                content: "The next-auth company has decided to change the name of the authentication package to be authjs which is a big decision"
            },
            {
                title: "The title",
                content: "This content is only for testing and does not have any literal meaning. It is only for sake of app testing and handling backend"
            }
        ];

        return NextResponse.json({
            message: "Popular-Blogs fetched success",
            allBlogs: blogs
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Cannot get the blog"}, 
            {status: 500}
        )
    }
}