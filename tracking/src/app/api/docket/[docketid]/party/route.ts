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
      party_value,
      party_code,
      party_name,
      party_company,
      party_address,
      party_city,
      party_pin,
      party_telephone,
    } = body;

    if (
      !party_value ||
      !["consignor", "consignee"].includes(party_value) ||
      !party_code ||
      !party_name ||
      !party_company ||
      !party_address ||
      !party_city
    ) {
      return new Response("Invalid body data", { status: 400 });
    }

    const trackingRecord = await TrackingModel.findOne({ docket_id: docketid });

    if (!trackingRecord) {
      return new Response("Tracking record not found", { status: 404 });
    }

    const updatedParty = {
      code: party_code,
      name: party_name,
      company: party_company,
      address: party_address,
      city: party_city,
      pin: party_pin ? parseInt(party_pin) : undefined,
      tel: party_telephone ? parseInt(party_telephone) : undefined,
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
