"use client";
import { createShip } from "@/actions/ship";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NewShipAddForm() {
  const [state, formAction] = useActionState<any, FormData>(
    createShip,
    undefined
  );
  const router = useRouter();
  const [countries, setCountries] = useState<string[]>([]);
  const [shipTypes, setShipTypes] = useState<string[]>([]);
  const [ecoStandart, setEcoStandart] = useState<string[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    fetch("/lists/countries.json")
      .then((response) => response.json())
      .then((data) => setCountries(data.countries || []))
      .catch((error) => console.error("Error loading countries:", error));

    fetch("/lists/shiptypes.json")
      .then((response) => response.json())
      .then((data) => setShipTypes(data.shipTypes || []))
      .catch((error) => console.error("Error loading types:", error));

    fetch("/lists/ecostandart.json")
      .then((response) => response.json())
      .then((data) => setEcoStandart(data.ecoStandards || []))
      .catch((error) => console.error("Error loading eco standart:", error));

    fetch("/lists/currentstatus.json")
      .then((response) => response.json())
      .then((data) => setCurrentStatus(data.statuses || []))
      .catch((error) => console.error("Error loading eco standart:", error));

    fetch("/lists/years.json")
      .then((response) => response.json())
      .then((data) => setYears(data.years || []))
      .catch((error) => console.error("Error loading eco standart:", error));
    if (state?.success && state?.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:border-2 hover:border-solid hover:shadow-xl transform transition-all duration-300"
    >
      <h2 className="flex justify-center font-bold mt-6 mb-2  border-b-2 border-[#3fbcff] ">
        Add New Ship
      </h2>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="shipname"
          required
          placeholder="Ship Name"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300 "
        />
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="flag"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Select Country Flag
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="type"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Ship Type
          </option>
          {shipTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Deadweight */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="deadweight"
          required
          placeholder="Deadweight: (DWT)"
          step="100"
          min="0"
          pattern="\\d*"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Beam */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          step="0.1"
          name="beam"
          placeholder="Beam: (ft)"
          min="0"
          pattern="\\d*"
          required
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Length */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="length"
          required
          pattern="\\d*"
          placeholder="Length: (ft)"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Width */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="width"
          required
          pattern="\\d*"
          placeholder="Width: (ft)"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* MMSI */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="mmsi"
          required
          pattern="\\d*"
          placeholder="MMSI"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* IMO Number */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="imoNumber"
          required
          placeholder="IMO"
          pattern="\\d*"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Callsign */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="callsign"
          placeholder="Callsign"
          required
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Eco Standard */}
      <div className="flex flex-wrap items-center">
        <select
          name="ecoStandard"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            ECO Standart
          </option>
          {ecoStandart.map((eco, index) => (
            <option key={index} value={eco}>
              {eco}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="portOfRegistry"
          required
          placeholder="port of registry"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      {/* Year of Build */}
      <div className="flex flex-wrap items-center">
        <select
          name="yearBuilt"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Year of Build
          </option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Current Status */}
      <div className="flex flex-wrap items-center">
        <select
          name="currentStatus"
          required
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue="unknown"
        >
          <option value="" disabled>
            Select Status
          </option>
          {currentStatus.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-40 mt-4 bg-[#3fbcff] text-white py-2 rounded-md hover:bg-[#1b69aa] transition duration-150"
        >
          Submit
        </button>
      </div>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
