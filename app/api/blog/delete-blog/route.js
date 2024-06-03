import User from "@/app/model/User";
import { dbConnect } from "@/app/lib/dbConnect";

dbConnect();

export async function POST(request) {
    const { blogid, username } = await request.json();
    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $pull: { blogs: { _id: blogid } } },
            { new: true }
        );

        if (!user) {
            return new Response(JSON.stringify({
                success: false,
                message: "User does not exist, cannot delete blog"
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Deleted blog successfully"
        }), { status: 200 });

    } catch (error) {
        console.error("Error deleting blog:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Blog could not be deleted"
        }), { status: 500 });
    }
}
