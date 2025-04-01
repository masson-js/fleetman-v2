"use client";
import { createLogbook } from "@/actions/logbook";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewAddLogbookForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createLogbook,
    undefined
  );

  const router = useRouter();
  const [logbookOperationTypes, setlogbookOperationTypes] = useState<string[]>(
    []
  );
  const [weatherCondition, setWeatherCondition] = useState<string[]>([]);
  const [seaCondition, setSeaCondition] = useState<string[]>([]);
  const [engineStatus, setEngineStatus] = useState<string[]>([]);

  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/lists/logbookOperationTypes.json").then((res) => res.json()),
      fetch("/lists/logbookWeatherCondition.json").then((res) => res.json()),
      fetch("/lists/logbookSeaCondition.json").then((res) => res.json()),
      fetch("/lists/logbookEngineStatus.json").then((res) => res.json()),
    ])
      .then(
        ([
          logbookOperationTypesData,
          weatherConditionData,
          seaConditionData,
          engineStatusData,
        ]) => {
          setlogbookOperationTypes(
            logbookOperationTypesData.operationTypes || []
          );
          setWeatherCondition(weatherConditionData.weatherConditions || []);
          setSeaCondition(seaConditionData.seaConditions || []);
          setEngineStatus(engineStatusData.engineStatuses || []);
        }
      )

      .catch((error) => console.error("Error loading data:", error));
  }, []);

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
      <div className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:border-2 hover:border-solid hover:shadow-xl transform transition-all duration-300 animate-fade-in">
        <Check color="green" size={64} className="mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center justify-center items-center ">
          Logbook created successfully
        </h2>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:shadow-xl transition-opacity duration-500 opacity-0 animate-fade-in"
    >
      <h2 className="flex justify-center font-bold mt-6 mb-2  border-b-2 border-[#2a0e0e]">
        Add Logbook for the Ship
      </h2>
      <div className="flex flex-wrap items-center">
        <select
          name="shipName"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Select the Ship
          </option>
          {shipsNames.map((shipName) => (
            <option value={shipName} key={shipName}>
              {shipName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Logbook Date
        </label>
        <input
          type="date"
          name="date"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="location"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          placeholder="Enter location"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="operationType"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Operation Type
          </option>

          {logbookOperationTypes.map((types, index) => (
            <option key={index} value={types}>
              {types}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <textarea
          name="eventDescription"
          required
          rows={4}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          placeholder="Enter event description"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="weatherConditions"
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Weather Condition
          </option>
          {weatherCondition.map((condition, index) => (
            <option key={index} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="seaConditions"
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Sea Conditions
          </option>

          {seaCondition.map((sea, index) => (
            <option key={index} value={sea}>
              {sea}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center  flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Speed (knots) - (optional)
        </label>
        <div className="relative">
          <input
            type="number"
            name="speed"
            min="0"
            max="30"
            step="0.1"
            className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
            placeholder="0.0"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="engineStatus"
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Engine Status
          </option>
          {engineStatus.map((engine, index) => (
            <option key={index} value={engine}>
              {engine}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="fuelConsumption"
          min="0"
          max="1000"
          step="1"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          placeholder="Fuel Consumption (optional)"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="crewCount"
          min="0"
          max="10000"
          step="1"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          placeholder="Crew Members Count"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="responsible"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          placeholder="Rresponsible Person"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <textarea
          name="notes"
          rows={4}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          placeholder="Any Additional Notes (optional)"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-extralight text-xs w-40 m-2">
          Inspection Check:
        </label>
        <label className="inline-flex items-center m-2 cursor-pointer">
          <input
            type="checkbox"
            name="inspectionCheck"
            className="sr-only peer"
          />
          <div
            className="
      h-5 w-5
      border-2 border-[#3fbcff61]
      rounded-md
      peer-hover:border-[#3fbcff]
      peer-checked:bg-[#3fbcff]
      peer-checked:border-[#3fbcff]
      peer-focus:ring-2 peer-focus:ring-[#3fbcff]
      transition-all duration-300
    "
          >
            <svg
              className="w-full h-full text-white opacity-0 peer-checked:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M5 12l5 5l10 -10"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </label>
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
