"use client";
import React, { useEffect, useState } from "react";
import { Tracking, Update, Party } from "@/app/types/types";

const TrackingForm = ({ params }: { params: { docketid: string } }) => {
  const [docketid, setDocketId] = useState("");
  const [activeSection, setActiveSection] = useState<
    "updates" | "parties" | "basics"
  >("updates");
  const [tracking, setTracking] = useState<Tracking>();
  const [newUpdate, setNewUpdate] = useState<Partial<Update>>({
    curr_location: "",
    dest_location: "",
    status: "arrived",
    remarks: "",
  });
  const [partyToEdit, setPartyToEdit] = useState<"consignor" | "consignee">(
    "consignor",
  );
  const [partyDetails, setPartyDetails] = useState<Partial<Party>>({
    code: "",
    name: "",
    company: "",
    address: "",
    city: "",
    pin: undefined,
    tel: undefined,
  });
  const [basicDetails, setBasicDetails] = useState({
    source: "",
    destination: "",
    no_of_pcs: 0,
    mode_of_payment: "",
    transport_mode: "",
  });

  useEffect(() => {
    async function fetchTracking() {
      try {
        const { docketid } = await params;
        setDocketId(docketid);
        const response = await fetch(`/api/docket/${docketid}`);
        const data = await response.json();
        setTracking(data.tracking);
        if (data.tracking) {
          setBasicDetails({
            source: data.tracking.source,
            destination: data.tracking.destination,
            no_of_pcs: data.tracking.no_of_pcs,
            mode_of_payment: data.tracking.mode_of_payment,
            transport_mode: data.tracking.transport_mode,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchTracking();
  }, [params]);

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/api/docket/${docketid}/updates`, {
        method: "PUT",

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Something Went Wrong`);
      }

      const res_data = await response.json();
      console.log(res_data);
    } catch (err) {
      console.log(err);
    }

    console.log("Submitting update:", newUpdate);
  };

  const handlePartySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/api/docket/${docketid}/party`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log("Something went wrong");
        return;
      }

      const res_data = await response.json();
      console.log(res_data);
    } catch (err) {
      console.log(err);
    }
    console.log("Submitting party update:", partyToEdit, partyDetails);
  };

  const handleBasicsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/api/docket/${docketid}/basic`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log("Something went wrong");
        return;
      }

      const res_data = await response.json();
      console.log(res_data);
    } catch (err) {
      console.log(err);
    }
    console.log("Submitting basic details:", basicDetails);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveSection("updates")}
          className={`px-4 py-2 rounded ${activeSection === "updates" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Add Update
        </button>
        <button
          onClick={() => setActiveSection("parties")}
          className={`px-4 py-2 rounded ${activeSection === "parties" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Edit Parties
        </button>
        <button
          onClick={() => setActiveSection("basics")}
          className={`px-4 py-2 rounded ${activeSection === "basics" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Basic Details
        </button>
      </div>

      {activeSection === "updates" && (
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Add New Update</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Current Location"
              name="update_currlocation"
              className="w-full p-2 border rounded"
              value={newUpdate.curr_location}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, curr_location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Destination Location"
              className="w-full p-2 border rounded"
              name="update_deslocation"
              value={newUpdate.dest_location}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, dest_location: e.target.value })
              }
            />
            <select
              className="w-full p-2 border rounded"
              value={newUpdate.status}
              name="update_status"
              onChange={(e) =>
                setNewUpdate({
                  ...newUpdate,
                  status: e.target.value as Update["status"],
                })
              }
            >
              <option value="arrived">Arrived</option>
              <option value="departed">Departed</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Remarks"
              className="w-full p-2 border rounded"
              name="update_remarks"
              value={newUpdate.remarks}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, remarks: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Update
          </button>
        </form>
      )}

      {activeSection === "parties" && (
        <form onSubmit={handlePartySubmit} className="space-y-4 text-black">
          <h2 className="text-xl font-bold mb-4">Edit Party Details</h2>
          <div className="mb-4">
            <select
              className="w-full p-2 border rounded"
              value={partyToEdit}
              name="party_value"
              onChange={(e) =>
                setPartyToEdit(e.target.value as "consignor" | "consignee")
              }
            >
              <option value="consignor">Consignor</option>
              <option value="consignee">Consignee</option>
            </select>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Code"
              name="party_code"
              className="w-full p-2 border rounded"
              value={partyDetails.code}
              onChange={(e) =>
                setPartyDetails({ ...partyDetails, code: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              name="party_name"
              value={partyDetails.name}
              onChange={(e) =>
                setPartyDetails({ ...partyDetails, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Company"
              name="party_company"
              className="w-full p-2 border rounded"
              value={partyDetails.company}
              onChange={(e) =>
                setPartyDetails({ ...partyDetails, company: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              name="party_address"
              className="w-full p-2 border rounded"
              value={partyDetails.address}
              onChange={(e) =>
                setPartyDetails({ ...partyDetails, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border rounded"
              name="party_city"
              value={partyDetails.city}
              onChange={(e) =>
                setPartyDetails({ ...partyDetails, city: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="PIN Code"
              name="party_pin"
              className="w-full p-2 border rounded"
              value={partyDetails.pin || ""}
              onChange={(e) =>
                setPartyDetails({
                  ...partyDetails,
                  pin: parseInt(e.target.value),
                })
              }
            />
            <input
              type="tel"
              placeholder="Telephone"
              name="party_telephone"
              className="w-full p-2 border rounded"
              value={partyDetails.tel || ""}
              onChange={(e) =>
                setPartyDetails({
                  ...partyDetails,
                  tel: parseInt(e.target.value),
                })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Update Party Details
          </button>
        </form>
      )}

      {activeSection === "basics" && (
        <form onSubmit={handleBasicsSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Edit Basic Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Source"
              className="w-full p-2 border rounded"
              name="basics_source"
              value={basicDetails.source}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, source: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Destination"
              className="w-full p-2 border rounded"
              name="basics_destination"
              value={basicDetails.destination}
              onChange={(e) =>
                setBasicDetails({
                  ...basicDetails,
                  destination: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Number of Pieces"
              className="w-full p-2 border rounded"
              name="basics_no_of_pieces"
              value={basicDetails.no_of_pcs}
              onChange={(e) =>
                setBasicDetails({
                  ...basicDetails,
                  no_of_pcs: parseInt(e.target.value),
                })
              }
            />
            <input
              type="text"
              placeholder="Mode of Payment"
              name="basics_mode_of_payment"
              className="w-full p-2 border rounded"
              value={basicDetails.mode_of_payment}
              onChange={(e) =>
                setBasicDetails({
                  ...basicDetails,
                  mode_of_payment: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Transport Mode"
              className="w-full p-2 border rounded"
              name="basics_transport_mode"
              value={basicDetails.transport_mode}
              onChange={(e) =>
                setBasicDetails({
                  ...basicDetails,
                  transport_mode: e.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Update Basic Details
          </button>
        </form>
      )}
    </div>
  );
};

export default TrackingForm;
