"use client";

import { createFixture } from "@/actions/fixture";
import { useActionState } from "react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function AddFixtureForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createFixture,
    undefined
  );
 

  return (
    <form
      action={formAction}
      className="flex flex-col bg-white p-6 ml-12 mt-6 rounded-lg text-gray-700 gap-4 w-1/2 items-center"
    >
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Add New Fixture
      </h2>

      {/* Ship Selection */}
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

      {/* Charterer Name */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Charterer Name:</label>
        <input
          type="text"
          name="chartererName"
          placeholder="Enter charterer name"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Start Date:</label>
        <input
          type="date"
          name="startDate"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* End Date */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">End Date:</label>
        <input
          type="date"
          name="endDate"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* Total Cost */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Total Cost:</label>
        <input
          type="number"
          name="totalCost"
          step="0.01"
          required
          placeholder="Enter total cost"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* Currency */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Currency:</label>
        <select
          name="currency"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue=""
        >
          <option value="" disabled>
            Select currency
          </option>
          <option value="USD">USD - US Dollar</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="EUR">EUR - Euro</option>
          <option value="SEK">SEK - Swedish Krona</option>
          <option value="NOK">NOK - Norwegian Krone</option>
          <option value="DKK">DKK - Danish Krone</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Payment Terms:</label>
        <select
          name="paymentTerms"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue=""
        >
          <option value="" disabled>
            Select payment terms
          </option>
          <option value="advance">Advance Payment</option>
          <option value="half-advance-half-on-completion">
            50% Advance, 50% on Completion
          </option>
          <option value="on-completion">Payment on Completion</option>
          <option value="net-30">Net 30 Days</option>
          <option value="net-60">Net 60 Days</option>
          <option value="milestone-based">Milestone-Based Payments</option>
          <option value="installments">Installments</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Cargo Description */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Cargo Description:</label>
        <textarea
          name="cargoDescription"
          rows={3}
          placeholder="Enter cargo description (if applicable)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* Delivery Location */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Delivery Location:</label>
        <input
          type="text"
          name="deliveryLocation"
          placeholder="Enter delivery location"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Fixture Type:</label>
        <select
          name="fixtureType"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue=""
        >
          <option value="" disabled>
            Select fixture type
          </option>
          <option value="time-charter">Time Charter</option>
          <option value="voyage-charter">Voyage Charter</option>
          <option value="bareboat-charter">Bareboat Charter</option>
          <option value="contract-of-affreightment">
            Contract of Affreightment (COA)
          </option>
          <option value="spot-charter">Spot Charter</option>
          <option value="demise-charter">Demise Charter</option>
          <option value="lump-sum-freight">Lump Sum Freight</option>
          <option value="consecutive-voyage">Consecutive Voyage Charter</option>
          <option value="trip-charter">Trip Charter</option>
          <option value="freight-on-demand">Freight on Demand</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Broker Name */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Broker Name:</label>
        <input
          type="text"
          name="brokerName"
          placeholder="Enter broker name (if applicable)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Status:</label>
        <select
          name="status"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue=""
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="on-hold">On Hold</option>
          <option value="terminated">Terminated</option>
          <option value="draft">Draft</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Cancellation Terms */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Cancellation Terms:</label>
        <textarea
          name="cancellationTerms"
          rows={3}
          placeholder="Enter cancellation terms (if applicable)"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* Notes */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Notes:</label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Enter any additional notes"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* Is Completed */}
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Is Completed:</label>
        <input type="checkbox" name="isCompleted" className="m-2" />
      </div>

      {/* Submit Button */}
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
