import mongoose, { Schema } from "mongoose";
import { Tracking } from "../types/types";

const TrackingSchema: Schema<Tracking> = new Schema({
  docket_id: Number,
  source: String,
  docs_assigned: Boolean,
  no_of_pcs: Number,
  transport_mode: String,
  mode_of_payment: String,
  destination: String,
  created_at: { type: Date, default: Date.now },
  consignee: {
    code: String,
    name: String,
    company: String,
    address: String,
    city: String,
    pin: Number,
    tel: Number,
  },
  consignor: {
    code: String,
    name: String,
    company: String,
    address: String,
    city: String,
    pin: Number,
    tel: Number,
  },
  updates: [],
});

const TrackingModel =
  (mongoose.models.Tracking as mongoose.Model<Tracking>) ||
  mongoose.model<Tracking>("Tracking", TrackingSchema);
export default TrackingModel;
