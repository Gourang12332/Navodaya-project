"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Tracking() {
  const router = useRouter();
  const {data : session} = useSession();

  async function handleUpdateDocket(e: React.FormEvent) {
    e.preventDefault();

   
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    router.push(`/dashboard/tracking/${data.docketid}`);
  }

  if(!session){
    return(
      <>
        <p>First be authenticated to update our tracks  
          <br />
          only for navodaya employees
        </p>

        <button className="signin" onClick={() =>{
        window.location.href = "/sign-in"
        }}>
Sign in
</button>
</>
    )
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
