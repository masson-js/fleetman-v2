"use client";

import { createFixture } from "@/actions/fixture";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewAddFixtureForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createFixture,
    undefined
  );

  const [displayValue, setDisplayValue] = useState("");
  const [realValue, setRealValue] = useState("");

  console.log(realValue);

  const formatNumberWithSpaces = (value: string) => {
    const num = Number(value);
    return num.toLocaleString("fr-FR");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");

    setRealValue(inputValue);

    setDisplayValue(formatNumberWithSpaces(inputValue));
  };

  useEffect(() => {
    if (realValue) {
      setDisplayValue(formatNumberWithSpaces(realValue));
    } else {
      setDisplayValue("");
    }
  }, [realValue]);

  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (state?.success && state?.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  useEffect(() => {
    if (state?.success && state?.redirect) {
      setIsCreating(false);
      setIsCreated(true);

      const timer = setTimeout(() => {
        router.push("/client/status");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    setIsCreating(true);
    formAction(formData);
  };

  if (isCreated) {
    return (
      <div className="flex flex-col h-60 w-60 items-center bg-white  justify-center mt-24 mb-24  p-10">
        <Check color="green" size={64} className="mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center justify-center items-center ">
          Fixture created successfully
        </h2>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:shadow-xl transition-opacity duration-500 opacity-0 animate-fade-in"
    >
      <h2 className="flex justify-center font-bold mt-6 mb-2  border-b-2 border-[#79c314]">
        Add Fixture to the Ship
      </h2>

      {/* Ship Selection */}
      <div className="flex flex-wrap items-center">
        <select
          name="shipName"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
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
        <input
          type="text"
          name="chartererName"
          placeholder="Charterer Name"
          pattern="^[A-Za-z\s]+$"
          maxLength={50}
          minLength={3}
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^A-Za-z\s]/g, "");
          }}
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          required
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      {/* End Date */}
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          required
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      {/* Total Cost */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          inputMode="numeric"
          placeholder="Total Cost"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
        <input type="hidden" name="totalCost" value={realValue} />
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
