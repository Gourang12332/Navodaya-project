import dbconnect from "@/app/lib/dbconnect";
import UserModel from "@/app/models/User";

export async function POST(request:Request) {
    await dbconnect()

    try {
        const users  = await UserModel.find({})
        return Response.json({
            users,
            success : true,
            message : "okay got the history"
        },{
            status : 200
        })
    } catch (error) {
        return Response.json(
            {
                success : false,
                message : "Error fetching history"
            } , {
                status : 400
            }
        )
    }
}