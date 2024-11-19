"use client";
import { createLogbook } from "@/actions";
import { useActionState } from "react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function AddLogbookForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createLogbook,
    undefined
  );

  return (
    <form
      action={formAction}
      className="flex flex-col bg-white p-6 ml-12 mt-6 rounded-lg text-gray-700 gap-4 w-1/2 items-center"
    >
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Add Logbook for the Ship
      </h2>

      {/* Ship Selection */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Select Ship:</label>
        <select
          name="shipName"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
        <label className="font-sans w-40 m-2">Date:</label>
        <input
          type="date"
          name="date"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Location:</label>
        <input
          type="text"
          name="location"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter location"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Operation Type:</label>
        <select
          name="operationType"
          required
          defaultValue=""
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled>
            Select operation type
          </option>
          <option value="portEntry">Port Entry</option>
          <option value="portExit">Port Exit</option>
          <option value="cargoLoading">Cargo Loading</option>
          <option value="cargoUnloading">Cargo Unloading</option>
          <option value="maintenance">Maintenance</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Event Description:</label>
        <textarea
          name="eventDescription"
          required
          rows={4}
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter event description"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Weather Conditions:</label>
        <select
          name="weatherConditions"
          defaultValue=""
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled>
            Select weather conditions
          </option>
          <option value="clear">Clear</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="foggy">Foggy</option>
          <option value="other">other</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Sea Conditions:</label>
        <select
          name="seaConditions"
          defaultValue=""
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled>
            Select sea conditions
          </option>
          <option value="calm">Calm</option>
          <option value="rough">Rough</option>
          <option value="choppy">Choppy</option>
          <option value="other">other</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Speed (knots):</label>
        <input
          type="number"
          name="speed"
          step="0.1"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter speed (optional)"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Engine Status:</label>
        <select
          name="engineStatus"
          defaultValue=""
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled>
            Select engine status
          </option>
          <option value="running">Running</option>
          <option value="stopped">Stopped</option>
          <option value="idling">Idling</option>
          <option value="underMaintenance">Under Maintenance</option>
          <option value="faulty">Faulty</option>
        </select>
      </div>

      {/* Fuel Consumption */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Fuel Consumption (liters):</label>
        <input
          type="number"
          name="fuelConsumption"
          step="0.1"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter fuel consumption (optional)"
        />
      </div>

      {/* Crew Count */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Crew Count:</label>
        <input
          type="number"
          name="crewCount"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter number of crew members"
        />
      </div>

      {/* Inspection Check */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Inspection Check:</label>
        <input type="checkbox" name="inspectionCheck" className="m-2" />
      </div>

      {/* Responsible Person */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Responsible Person:</label>
        <input
          type="text"
          name="responsible"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter responsible person"
        />
      </div>

      {/* Notes */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Notes:</label>
        <textarea
          name="notes"
          rows={4}
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter any additional notes (optional)"
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
