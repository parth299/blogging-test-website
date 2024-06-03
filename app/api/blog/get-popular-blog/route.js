import { NextResponse, NextRequest } from "next/server";
import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/dbConnect";

dbConnect();

export async function GET(request) {
    try {
        const limit = 4;
        const skip = 0;
        const blogs = await User.aggregate([
            { $unwind: '$blogs' },
            { $sort: { 'blogs.createdAt': -1 } },
            { $skip: skip },
            { $limit: limit },
            { $project: {
                _id: 0,
                blog: '$blogs'
              }
            }
          ]);

        return NextResponse.json({
            message: "Popular-Blogs fetched success",
            blogs
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Cannot get the blog"}, 
            {status: 500}
        )
    }
}