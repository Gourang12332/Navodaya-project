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
