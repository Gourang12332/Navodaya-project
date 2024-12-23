export type Tracking = {
  docket_id: number;
  source: string;
  destination: string;
  docs_assigned: boolean;
  no_of_pcs: number;
  mode_of_payment: string;
  transport_mode: string;
  updates: Update[];
  consignor: Party;
  consignee: Party;
  created_at: Date;
};

export type Body_Punch_Route = {
  docketid: string;
  destination: string;
  source: string;
  consignor_code: string;
  consignor_name: string;
  mode_of_transport: string;
  mode_of_payment: string;
  no_of_pcs: string;
  docs_assigned: string;
  consignor_company: string;
  consignor_address: string;
  consignor_city: string;
  consignor_pin: string;
  consignor_tel: string;
  consignee_code: string;
  consignee_name: string;
  consignee_company: string;
  consignee_address: string;
  consignee_city: string;
  consignee_pin: string;
  consignee_tel: string;
};

export type Update = {
  curr_location: string;
  dest_location: string;
  status: "arrived" | "departed" | "other";
  remarks: string;
  arrived_at: Date;
};

export type Party = {
  code: string;
  name: string;
  company: string;
  address: string;
  city: string;
  pin?: number;
  tel?: number;
};
