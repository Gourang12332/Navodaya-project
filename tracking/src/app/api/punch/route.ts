import TrackingModel from "@/app/models/tracking";
import { Body_Punch_Route } from "@/app/types/types";

export async function POST(request: Request) {
  try {
    const res: Body_Punch_Route = await request.json();
    const docsAssigned = res.docs_assigned === "on" ? true : false;
    const history = false;

    const tracking = new TrackingModel({
      docket_id: Number(res.docketid),
      source: res.source,
      destination: res.destination,
      mode_of_payment: res.mode_of_payment,
      transport_mode: res.mode_of_transport,
      history: false,
      no_of_pcs: Number(res.no_of_pcs),
      docs_assigned: docsAssigned,
      consignor: {
        code: res.consignor_code,
        name: res.consignor_name,
        company: res.consignor_company,
        address: res.consignor_address,
        city: res.consignor_city,
        pin: Number(res.consignor_pin),
        tel: Number(res.consignor_tel),
      },
      consignee: {
        code: res.consignee_code,
        name: res.consignee_name,
        company: res.consignee_company,
        address: res.consignee_address,
        city: res.consignee_city,
        pin: Number(res.consignee_pin),
        tel: Number(res.consignee_tel),
      },
      updates: [],
    });
    await tracking.save();
    return Response.json({ status: "success" });
  } catch (err) {
    console.log(err);
    return Response.error();
  }
}
