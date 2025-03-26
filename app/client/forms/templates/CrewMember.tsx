"use client";

import { createCrew } from "@/actions/crew";
import { useActionState } from "react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function AddCrewForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createCrew,
    undefined
  );

  return (
    <form
      action={formAction}
      className="flex flex-col bg-white p-6 ml-12 mt-6 rounded-lg text-gray-700 gap-4 w-1/2 items-center"
    >
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Add New Crew Member
      </h2>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Select Ship:</label>
        <select
          name="shipName"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {shipsNames.map((ship) => (
            <option value={ship} key={ship}>
              {ship}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter crew member name"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Role:</label>
        <select
          name="role"
          defaultValue=""
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option disabled>Select role</option>
          <option value="Captain">Captain</option>
          <option value="Chief Officer">Chief Officer</option>
          <option value="Second Officer">Second Officer</option>
          <option value="Third Officer">Third Officer</option>
          <option value="Engineer">Engineer</option>
          <option value="Chief Engineer">Chief Engineer</option>
          <option value="Deckhand">Deckhand</option>
          <option value="Cook">Cook</option>
          <option value="Bosun">Bosun</option>
          <option value="Steward">Steward</option>
          <option value="Able Seaman">Able Seaman</option>
          <option value="Deck Officer">Deck Officer</option>
          <option value="Motorman">Motorman</option>
          <option value="Welder">Welder</option>
          <option value="Electrician">Electrician</option>
          <option value="Chief Steward">Chief Steward</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Join Date:</label>
        <input
          type="date"
          name="joinDate"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Contract End Date:</label>
        <input
          type="date"
          name="contractEndDate"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Status:</label>
        <select
          name="status"
          required
          defaultValue=""
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="active">Active</option>
          <option value="on-leave">On Leave</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Qualifications:</label>
        <textarea
          name="qualifications"
          placeholder="Enter crew member qualifications (optional)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          rows={3}
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Certifications:</label>
        <textarea
          name="certifications"
          placeholder="Enter crew member certifications (optional)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          rows={3}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Leave Date:</label>
        <input
          type="date"
          name="leaveDate"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Nationality:</label>
        <input
          type="text"
          name="nationality"
          placeholder="Enter crew member nationality"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <button
        type="submit"
        className="w-40 m-6 bg-gray-400 text-white py-2 rounded-md hover:bg-black transition duration-150"
      >
        Submit
      </button>

      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
