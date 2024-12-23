"use client";
import { Tracking } from "@/app/types/types";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

export default function TrackingPage({
  params,
}: {
  params: { docketid: string };
}) {
  const [trackingData, setTrackingData] = useState<Tracking | null>(null);
  const [docketid, setDocketid] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedUpdate, setExpandedUpdate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTracking() {
      try {
        const { docketid } = await params;
        const response = await fetch(`/api/docket/${docketid}`);
        setDocketid(docketid);
        if (!response.ok) {
          throw new Error("Failed to fetch tracking data.");
        }
        const data: Tracking = await response.json();
        setTrackingData(data);
      } catch (error) {
        console.error("Error fetching tracking data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTracking();
  }, [params]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "arrived":
        return "bg-green-600";
      case "departed":
        return "bg-yellow-500";
      default:
        return "bg-blue-600";
    }
  };

  const getTextColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "arrived":
        return "text-green-600";
      case "departed":
        return "text-yellow-600";
      default:
        return "text-blue-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#800000]"></div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="p-8 text-center text-[#800000]">
        No tracking data found for Docket ID: {docketid}
      </div>
    );
  }

  const toggleUpdate = (index: number) => {
    setExpandedUpdate(expandedUpdate === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#800000] border-b-2 border-[#800000]/20 pb-4">
          Tracking Details for Docket ID: {docketid}
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-[#800000]/20">
          <h2 className="text-xl font-semibold text-[#800000] mb-4">
            Shipment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="text-[#800000] font-medium w-32">Source:</span>
                <span className="text-gray-700">{trackingData.source}</span>
              </p>
              <p className="flex items-center">
                <span className="text-[#800000] font-medium w-32">
                  Destination:
                </span>
                <span className="text-gray-700">
                  {trackingData.destination}
                </span>
              </p>
              <p className="flex items-center">
                <span className="text-[#800000] font-medium w-32">Pieces:</span>
                <span className="text-gray-700">{trackingData.no_of_pcs}</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="text-[#800000] font-medium w-32">
                  Payment Mode:
                </span>
                <span className="text-gray-700">
                  {trackingData.mode_of_payment}
                </span>
              </p>
              <p className="flex items-center">
                <span className="text-[#800000] font-medium w-32">
                  Transport:
                </span>
                <span className="text-gray-700">
                  {trackingData.transport_mode}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-[#800000] mb-6">
            Shipment Timeline
          </h2>
          <div className="relative">
            <div className="border-l-2 border-[#800000]/30 ml-4">
              {trackingData.updates.map((update, index) => (
                <div key={index} className="mb-8 relative">
                  <div
                    className={`absolute left-[-9px] w-5 h-5 rounded-full ${getStatusColor(
                      update.status,
                    )} border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110`}
                    onClick={() => toggleUpdate(index)}
                  />
                  <div
                    className={`ml-8 bg-white p-4 rounded-lg border ${
                      expandedUpdate === index
                        ? "border-[#800000]/40"
                        : "border-[#800000]/20"
                    } shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                    onClick={() => toggleUpdate(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="text-[#800000]" size={18} />
                        <span className="font-medium text-[#800000]">
                          {update.curr_location}
                        </span>
                      </div>
                      {expandedUpdate === index ? (
                        <ChevronUp className="text-[#800000]" size={18} />
                      ) : (
                        <ChevronDown className="text-[#800000]" size={18} />
                      )}
                    </div>

                    {expandedUpdate === index && (
                      <div className="mt-4 space-y-2 text-gray-600">
                        <p>
                          <span className="text-[#800000] font-medium">
                            Destination:
                          </span>{" "}
                          <span className="text-gray-700">
                            {update.dest_location}
                          </span>
                        </p>
                        <p>
                          <span className="text-[#800000] font-medium">
                            Status:
                          </span>{" "}
                          <span
                            className={`capitalize ${getTextColor(update.status)}`}
                          >
                            {update.status}
                          </span>
                        </p>
                        <p>
                          <span className="text-[#800000] font-medium">
                            Remarks:
                          </span>{" "}
                          <span className="text-gray-700">
                            {update.remarks}
                          </span>
                        </p>
                        <p>
                          <span className="text-[#800000] font-medium">
                            Timestamp:
                          </span>{" "}
                          <span className="text-gray-700">
                            {new Date(update.arrived_at).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
