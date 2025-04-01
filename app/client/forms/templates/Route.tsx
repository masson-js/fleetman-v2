"use client";

import { createRoute } from "@/actions/shipRoute";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewAddRouteForm({ shipsNames }: ShipsGetProps) {
  const router = useRouter();

  const [state, formAction] = useActionState<any, FormData>(
    createRoute,
    undefined
  );
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (state?.success && state?.redirect) {
      setIsCreating(false);
      setIsCreated(true);

      const timer = setTimeout(() => {
        router.push(state.redirect || "/client/status");
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
      <div className="flex flex-col h-60 w-60 items-center bg-white justify-center mt-24 mb-24 p-10">
        <Check color="green" size={64} className="mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center">
          Route created successfully
        </h2>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:shadow-xl transition-opacity duration-500 opacity-0 animate-fade-in"
    >
      <h2 className="flex justify-center font-bold mt-6 mb-2 border-b-2 border-[#79c314]">
        Add New Route
      </h2>

      {/* Ship Selection */}
      <div className="flex flex-wrap items-center">
        <select
          name="shipName"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Select the Ship
          </option>
          {shipsNames.map((ship) => (
            <option value={ship} key={ship}>
              {ship}
            </option>
          ))}
        </select>
      </div>

      {/* Start Port */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="start"
          required
          placeholder="Departure Port ex. Country/Port"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Destination Port */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="destination"
          required
          placeholder="Destination Port ex. Country/Port"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Departure Date */}
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs border-b-2 border-[#3fbcff76]">
          Departure Date
        </label>
        <input
          type="date"
          name="date"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      {/* Arrival Date */}
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs border-b-2 border-[#3fbcff76]">
          Estimated Arrival Date
        </label>
        <input
          type="date"
          name="arrivalDate"
          required
          min={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isCreating}
          className="w-40 mt-4 bg-[#3fbcff] text-white py-2 rounded-md hover:bg-[#1b69aa] transition duration-150"
        >
          {isCreating ? "Creating..." : "Submit"}
        </button>
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
