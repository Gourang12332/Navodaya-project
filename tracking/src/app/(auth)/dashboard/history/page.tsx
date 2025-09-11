"use client";

import { Tracking } from "@/app/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function History() {
  const [history, setHistory] = useState<Partial<Tracking>[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getHistory() {
      try {
        const resp = await fetch("/api/history");
        if (!resp.ok) {
          console.log("An Error Occurred");
        }
        const data = await resp.json();
        console.log(data);
        setHistory(data);
      } catch (err) {
        console.log(err);
      }
    }
    getHistory();
  }, []);

  const handleRowClick = (docketId: number) => {
    router.push(`/dashboard/history/${docketId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Docket History</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Docket ID</th>
              <th className="border border-gray-300 px-4 py-2">Source</th>
              <th className="border border-gray-300 px-4 py-2">Destination</th>
              <th className="border border-gray-300 px-4 py-2">
                Transport Mode
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Mode of Payment
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Number of Pieces
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Docs Assigned
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr
                key={item.docket_id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(item.docket_id!)}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {item.docket_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.source}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.destination}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.transport_mode}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.mode_of_payment}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.no_of_pcs}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.docs_assigned ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
