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

    const { party_value, code, name, company, address, city, pin, tel } = body;

    if (
      !party_value ||
      !["consignor", "consignee"].includes(party_value) ||
      !code ||
      !name ||
      !company ||
      !address ||
      !city
    ) {
      return new Response("Invalid body data", { status: 400 });
    }

    const trackingRecord = await TrackingModel.findOne({ docket_id: docketid });

    if (!trackingRecord) {
      return new Response("Tracking record not found", { status: 404 });
    }

    const updatedParty = {
      code: code,
      name: name,
      company: company,
      address: address,
      city: city,
      pin: pin ? parseInt(pin) : undefined,
      tel: tel ? parseInt(tel) : undefined,
    };

    if (party_value === "consignor") {
      trackingRecord.consignor = updatedParty;
    } else if (party_value === "consignee") {
      trackingRecord.consignee = updatedParty;
    }

    await trackingRecord.save();

    return new Response(
      JSON.stringify({ message: "Party updated successfully", trackingRecord }),
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
