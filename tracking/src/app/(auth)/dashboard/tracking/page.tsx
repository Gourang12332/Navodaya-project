"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Tracking() {
  const router = useRouter();

  async function handleUpdateDocket(e: React.FormEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    router.push(`/dashboard/tracking/${data.docketid}`);
  }

  return (
    <form className="flex flex-col " onSubmit={handleUpdateDocket}>
      <input
        type="number"
        name="docketid"
        id="docketid"
        className="text-black"
        placeholder="Enter The Docket Id you want to update"
      />
      <button type="submit">Go</button>
    </form>
  );
}
