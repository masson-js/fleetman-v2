"use client";
import { createInspection } from "@/actions";
import { useActionState } from "react";


interface ShipsGetProps {
  shipsNames: string[];
}

export default function AddInspectionForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createInspection,
    undefined
  );

  return (
    <form
      action={formAction}
      className="flex flex-col bg-white p-6 ml-12 mt-6 rounded-lg text-gray-700 gap-4 w-1/2 items-center"
    >
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Add Inspetion to the Ship
      </h2>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Select your ship:</label>
        <select
          name="shipName"
          required
          className=" w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue=""
        >
          {shipsNames.map((shipName) => (
            <option value={shipName} key={shipName}>
              {shipName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Inspection Date:</label>

        <input
          type="date"
          name="inspectionDate"
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          required
          placeholder="ex. Martin Zoltz"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Inspector:</label>
        <input
          type="text"
          name="inspectorName"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Inspection Type:</label>
        <select
          name="inspectionType"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option disabled>Select type</option>
          <option value="regular">Regular</option>
          <option value="unscheduled">Unscheduled</option>
          <option value="follow-up">Follow-Up</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Result:</label>
        <select
          name="results"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option disabled>Select results</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Recommendations:</label>
        <textarea
          name="recommendations"
          placeholder="Add recommendations (if any)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-10"
        ></textarea>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">
          Next Inspection Date: (optional)
        </label>
        <input
          type="date"
          name="nextInspectionDate"
          min="2000-01-01"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">
          Link to inspection report (optional)
        </label>
        <input
          type="url"
          name="inspectionReport"
          placeholder="Paste report URL or file link"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Compliance Standards:</label>
        <select
          name="complianceStandards"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Select compliance standards</option>
          <option value="MARPOL">MARPOL</option>
          <option value="SOLAS">SOLAS</option>
          <option value="ISO">ISO</option>
          <option value="AFS">AFS</option>
          <option value="SEEMP">SEEMP</option>
          <option value="EEDI">EEDI</option>
          <option value="ISM">ISM</option>
          <option value="MLC 2006">MLC 2006</option>
          <option value="STCW">STCW</option>
          <option value="IMDG">IMDG</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Deficiencies Found:</label>
        <textarea
          name="deficienciesFound"
          placeholder="Describe deficiencies (if any)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-10"
        ></textarea>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Corrective Actions:</label>
        <textarea
          name="correctiveActions"
          placeholder="Describe corrective actions (if needed)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-10"
        ></textarea>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Verification Status:</label>
        <select
          name="verificationStatus"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 min-h-10"
        >
          <option value="" disabled>
            Select verification status
          </option>
          <option value="passed">Passed</option>
          <option value="requires-work">Requires Work</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2"> Duration (in minutes):</label>
        <input
          type="number"
          name="duration"
          min="1"
          placeholder="Enter duration"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2"> EU Compliance:</label>
        <input
          type="checkbox"
          name="isEUCompliance"
          className="border rounded"
        />
        <span className="m-1">Yes</span>
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
