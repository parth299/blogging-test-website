import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/dbConnect";

dbConnect();

export async function POST(request) {
    try {   
        const {blogid} = await request.json();

        const user = await User.findOne({ 'blogs._id': blogid }, { 'blogs.$': 1 });

        if(user && user.blogs.length > 0) {
            const blog = user.blogs[0];
            return Response.json({
                success: true,
                messsage: "Fetched blog successfully",
                title: blog.title,
                content: blog.content
            }, {status: 200});
        } 
        else {
            return Response.json({
                success: false,
                message: "Cannot get the blog"
            }, {status: 404});
        }
    } catch (error) {
        return Response.json({
            success: false,
            message: "Cannot get the blog"
        }, {status: 500});
    }
}