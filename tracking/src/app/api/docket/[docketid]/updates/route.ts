import TrackingModel from "@/app/models/tracking";

export async function PUT(
  request: Request,
  { params }: { params: { docketid: string } },
) {
  try {
    const { docketid } = await params;
    console.log(docketid);
    if (!docketid) {
      return new Response("Invalid docket ID", { status: 400 });
    }

    const body = await request.json();
    console.log(body);

    const { curr_location, dest_location, status, remarks, reason } = body;

    if (!curr_location || !dest_location || !status || !remarks) {
      return new Response("Invalid body data", { status: 400 });
    }

    const trackingRecord = await TrackingModel.findOne({ docket_id: docketid });

    if (!trackingRecord) {
      return new Response("Tracking record not found", { status: 404 });
    }

    if (status == "delivered" || status == "cancelled") {
      trackingRecord.history = true;
    }

    const newUpdate = {
      curr_location: curr_location,
      dest_location: dest_location,
      status: status,
      reason: reason,
      remarks: remarks,
      arrived_at: new Date(),
    };

    trackingRecord.updates.push(newUpdate);

    await trackingRecord.save();

    return new Response(
      JSON.stringify({ message: "Update added successfully", trackingRecord }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
