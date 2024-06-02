import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/dbConnect";

dbConnect();

export async function POST(request) {

    const {username} = await request.json();

    try {

        const user = await User.findOne({username});
        if(!user) {
            return Response.json({
                success: false,
                message: "User does not exist"
            }, {status: 404})
        }

        // Get the blogs of the user
        const blogs = user.blogs;

        return Response.json({
            sucess: true,
            message: "Fetched the user blogs",
            blogs
        }, {status: 200});
    } catch (error) {
        return Response.json({
            success: false,
            message: "Cannot get user blogs"
        }, {status: 500})
    }
}