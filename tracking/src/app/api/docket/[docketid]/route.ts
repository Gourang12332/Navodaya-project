import TrackingModel from "@/app/models/tracking";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { docketid: string } },
) {
  try {
    const { docketid } = await params;
    console.log(docketid);
    const tracking = await TrackingModel.findOne({ docket_id: docketid });
    console.log(tracking);
    return Response.json(tracking);
  } catch (err) {
    return NextResponse.json({ error: "error occured" });
  }
}
