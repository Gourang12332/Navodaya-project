// history route will be here soon

import TrackingModel from "@/app/models/tracking";

export async function GET(request: Request) {
  try {
    const resp = await TrackingModel.find(
      { history: true },
      "docket_id source destination docs_assigned no_of_pcs mode_of_payment transport_mode",
    );
    console.log(resp);
    return Response.json(resp);
  } catch (err) {
    console.log(err);
  }
}
import dbconnect from "@/app/lib/dbconnect";
import UserModel from "@/app/models/User";

export async function POST(request: Request) {
  await dbconnect();

  try {
    const users = await UserModel.find({});
    return Response.json(
      {
        users,
        success: true,
        message: "okay got the history",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error fetching history",
      },
      {
        status: 400,
      },
    );
  }
}
