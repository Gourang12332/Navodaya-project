"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function handleTracking(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const dockerId = data.docker?.toString().trim();
    if (!dockerId) {
      alert("Please enter a valid Docker ID.");
      return;
    }

    router.push(`/tracking/${dockerId}`);
  }

  return (
    <>
      <form
        onSubmit={handleTracking}
        className="p-8 flex flex-col bg-red-200 w-[50%] gap-10"
      >
        <input type="text" name="docker" id="docker" className="text-black" />
        <button className="bg-red-800 text-white px-4 py-2">
          Track Docker
        </button>
      </form>
    </>
  );
}
