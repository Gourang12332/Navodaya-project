"use client"

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";


export default function page () {

     const [error, setError] = useState<string | undefined>(undefined);
       const { data: session } = useSession();

       if(!session){
        return(
            <p>First be authenticated to punch new docket</p>
        )
       }

    async function handleDocketPunch(e: React.FormEvent) {
        e.preventDefault();
        try {
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
    
          const data = Object.fromEntries(formData.entries());
    
          const response = await fetch("/api/punch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
    
          const result = await response.json();
          console.log("Submission successful:", result);
          setError(undefined);
          window.location.href = "/dashboard"
        } catch (err) {
          console.error(err);
          setError("Couldn't submit, something happened.");
        }
      }
      return (
        <div className="p-8 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome, {session?.user.username}
          </h1>
          <form
            className="bg-white shadow-md rounded-lg p-6 space-y-6 text-black"
            id="dockerpunch"
            onSubmit={handleDocketPunch}
          >
            {/* Docket Information */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="docketid"
                id="docketid"
                placeholder="Enter The Docket Id"
                className="input-field"
              />
              <input
                type="text"
                name="destination"
                id="destination"
                placeholder="Enter The Destination"
                className="input-field"
              />
              <input
                type="text"
                name="source"
                id="source"
                placeholder="Enter The Source"
                className="input-field"
              />
            </section>
    
            {/* Additional Information */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="mode_of_transport"
                id="mode_of_transport"
                className="input-field"
              >
                <option value="" disabled selected>
                  Select Mode of Transport
                </option>
                <option value="Cargo">Cargo</option>
                <option value="Cargo MultiModal">Cargo MultiModal</option>
                <option value="Courier">Courier</option>
                <option value="Courier MultiModal">Courier MultiModal</option>
                <option value="Surface/Air">Surface/Air</option>
              </select>
    
              <select
                name="mode_of_payment"
                id="mode_of_payment"
                className="input-field"
              >
                <option value="" disabled selected>
                  Select Mode of Payment
                </option>
                <option value="cod">COD</option>
                <option value="topay">To Pay</option>
              </select>
    
              <input
                type="number"
                name="no_of_pcs"
                id="no_of_pcs"
                placeholder="Enter Number of Pieces"
                className="input-field"
              />
            </section>
    
            <section>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="docs_assigned"
                  id="docs_assigned"
                  className="checkbox"
                />
                <span>Docs Assigned</span>
              </label>
            </section>
    
            {/* Consignor Information */}
            <section id="consignor">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Consignor Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="consignor_code"
                  id="consignor_code"
                  placeholder="Enter The Consignor Code"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignor_name"
                  id="consignor_name"
                  placeholder="Enter The Consignor Name"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignor_company"
                  id="consignor_company"
                  placeholder="Enter The Consignor Company"
                  className="input-field"
                />
                <textarea
                  name="consignor_address"
                  id="consignor_address"
                  placeholder="Enter The Consignor Address"
                  className="input-field h-24"
                ></textarea>
                <input
                  type="text"
                  name="consignor_city"
                  id="consignor_city"
                  placeholder="Enter The Consignor City"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignor_pin"
                  id="consignor_pin"
                  placeholder="Enter The Consignor Pin"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignor_tel"
                  id="consignor_tel"
                  placeholder="Enter The Consignor Telephone Number"
                  className="input-field"
                />
              </div>
            </section>
    
            {/* Consignee Information */}
            <section id="consignee">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Consignee Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="consignee_code"
                  id="consignee_code"
                  placeholder="Enter The Consignee Code"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignee_name"
                  id="consignee_name"
                  placeholder="Enter The Consignee Name"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignee_company"
                  id="consignee_company"
                  placeholder="Enter The Consignee Company"
                  className="input-field"
                />
                <textarea
                  name="consignee_address"
                  id="consignee_address"
                  placeholder="Enter The Consignee Address"
                  className="input-field h-24"
                ></textarea>
                <input
                  type="text"
                  name="consignee_city"
                  id="consignee_city"
                  placeholder="Enter The Consignee City"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignee_pin"
                  id="consignee_pin"
                  placeholder="Enter The Consignee Pin"
                  className="input-field"
                />
                <input
                  type="text"
                  name="consignee_tel"
                  id="consignee_tel"
                  placeholder="Enter The Consignee Telephone Number"
                  className="input-field"
                />
              </div>
            </section>
    
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </form>
          {error && <p className="text-red-900">{error}</p>}
            </div>
        )
}