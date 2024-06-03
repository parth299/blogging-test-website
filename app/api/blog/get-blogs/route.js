import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/dbConnect";

dbConnect()
export async function POST(request) {

    const {page} = await request.json();
    const limit = 10;
    const skip = (page - 1)*limit;
    try {
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
      
          return Response.json({
            success: true,
            blogs
          }, {status: 200})
    } catch (error) {
       return Response.json({
        success: false,
        message: "Cannot get blogs :: get-blogs"
       }, {status: 500}) 
    }
}