import TrackingModel from "@/app/models/tracking";

export async function PUT(
  request: Request,
  { params }: { params: { docketid: string } },
) {
  try {
    const { docketid } = await params;
    if (!docketid) {
      return new Response("Invalid docket ID", { status: 400 });
    }

    const body = await request.json();

    const {
      basics_source,
      basics_destination,
      basics_no_of_pieces,
      basics_mode_of_payment,
      basics_transport_mode,
    } = body;

    // Validate required fields
    if (
      !basics_source ||
      !basics_destination ||
      !basics_no_of_pieces ||
      !basics_mode_of_payment ||
      !basics_transport_mode
    ) {
      return new Response("Invalid body data", { status: 400 });
    }

    // Find the tracking record by docket_id
    const trackingRecord = await TrackingModel.findOne({ docket_id: docketid });

    if (!trackingRecord) {
      return new Response("Tracking record not found", { status: 404 });
    }

    // Update the fields in the tracking record
    trackingRecord.source = basics_source;
    trackingRecord.destination = basics_destination;
    trackingRecord.no_of_pcs = parseInt(basics_no_of_pieces, 10);
    trackingRecord.mode_of_payment = basics_mode_of_payment;
    trackingRecord.transport_mode = basics_transport_mode;

    // Save the updated record
    await trackingRecord.save();

    return new Response(
      JSON.stringify({
        message: "Basics updated successfully",
        trackingRecord,
      }),
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
