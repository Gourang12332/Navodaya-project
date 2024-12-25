"use client";

import { Tracking } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function DocketHistory({
  params,
}: {
  params: { docketid: string };
}) {
  const [docket, setDocket] = useState<Tracking | undefined>();
  const [docketid, setDocketid] = useState("");
  const [pdfUploaded, setPdfUploaded] = useState(false);

  useEffect(() => {
    async function getDocket() {
      try {
        const { docketid } = await params;
        console.log(docket);
        const resp = await fetch(`/api/docket/${docketid}`);
        if (!resp.ok) {
          console.log("Something went wrong");
        }
        const data: Tracking = await resp.json();
        console.log(data);
        setDocket(data);
        setDocketid(docketid);
      } catch (err) {
        console.log(err);
      }
    }
    getDocket();
  }, []);

  const handleUpload = () => {
    console.log("Upload button clicked");
    // Future logic for file upload goes here
  };

  const handleDownload = () => {
    console.log("Download button clicked");
    // Future logic for downloading the PDF goes here
  };

  if (!docket) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Docket Details</h1>

      {/* Docket Basic Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
        <p>
          <strong>Docket ID:</strong> {docket.docket_id}
        </p>
        <p>
          <strong>Source:</strong> {docket.source}
        </p>
        <p>
          <strong>Destination:</strong> {docket.destination}
        </p>
        <p>
          <strong>Number of Pieces:</strong> {docket.no_of_pcs}
        </p>
        <p>
          <strong>Mode of Payment:</strong> {docket.mode_of_payment}
        </p>
        <p>
          <strong>Transport Mode:</strong> {docket.transport_mode}
        </p>
        <p>
          <strong>Docs Assigned:</strong> {docket.docs_assigned ? "Yes" : "No"}
        </p>
        <p>
          <strong>History:</strong> {docket.history ? "Yes" : "No"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(docket.created_at).toLocaleString()}
        </p>
      </section>

      {/* Buttons for Uploading and Downloading */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Actions</h2>
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          Upload Image/PDF
        </button>
        {pdfUploaded && (
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download PDF
          </button>
        )}
      </section>

      {/* Updates Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Updates</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Current Location
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Destination
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Remarks</th>
                <th className="border border-gray-300 px-4 py-2">Reason</th>
                <th className="border border-gray-300 px-4 py-2">Arrived At</th>
              </tr>
            </thead>
            <tbody>
              {docket.updates &&
                docket.updates.map((update, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {update.curr_location}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {update.dest_location}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {update.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {update.remarks}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {update.reason || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(update.arrived_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
