"use client";
import { createShip } from "@/actions/ship";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useEffect } from "react";

export default function ShipAddForm() {
  const [state, formAction] = useActionState<any, FormData>(
    createShip,
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    // Проверяем, если экшен завершен и вернул успех
    if (state?.success) {
      router.push("/client/status");
    }
  }, [state, router]);
  return (
    <form
      action={formAction}
      className="flex flex-col bg-white p-6 ml-12 mt-6 rounded-lg text-gray-700 gap-4 w-1/2 items-center"
    >
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Add your ship to Manager
      </h2>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Ship name:</label>
        <input
          type="text"
          name="shipname"
          required
          placeholder="Asta Maria II"
          className=" w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Country flag:</label>
        <input
          type="text"
          name="flag"
          required
          placeholder="USA"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Ship type:</label>

        <select
          name="type"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option disabled>Select ship type</option>
          <option value="container">Container ship</option>
          <option value="tanker">Tanker</option>
          <option value="bulk-carrier">Bulk carrier</option>
          <option value="ro-ro">Ro-Ro</option>
          <option value="general-cargo">General cargo ship</option>
          <option value="passenger">Passenger ship</option>
          <option value="Feeder">Feeder ship</option>
          <option value="Heavy-lift">Heavy lift ship</option>
          <option value="livestock-carrier">Livestock carrier</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Deadweight: (DWT)</label>
        <input
          type="number"
          name="deadweight"
          required
          placeholder="40 000 DWT"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Beam: (ft)</label>
        <input
          type="number"
          step="0.1"
          name="beam"
          placeholder="82 ft"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Length:</label>
        <input
          type="number"
          name="length"
          required
          placeholder="100 ft"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Width:</label>
        <input
          type="number"
          name="width"
          required
          placeholder="15 ft"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">MMSI:</label>
        <input
          type="number"
          name="mmsi"
          required
          placeholder="123456789"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">IMO:</label>
        <input
          type="number"
          name="imoNumber"
          required
          placeholder="1234567"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Call sign:</label>
        <input
          type="text"
          name="callsign"
          placeholder="MMU ex."
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">ECO standart:</label>
        <select
          name="ecoStandard"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option disabled>Select ECO standart</option>
          <option value="EEDI / EEXI">EEDI / EEXI</option>
          <option value="CII">CII</option>
          <option value="MARPOL Annex VI">MARPOL Annex VI</option>
          <option value="Ballast Water Convention">
            Ballast Water Convention
          </option>
          <option value="Green Passport">Green Passport</option>
          <option value="Shore Power">Shore Power</option>
          <option value="Alternative Fuels">Alternative Fuels</option>
          <option value="Polar Code">Polar Code</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Port of registration:</label>
        <input
          type="text"
          name="portOfRegistry"
          required
          placeholder="port of registry"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Year of built:</label>
        <input
          type="number"
          name="yearBuilt"
          required
          placeholder="year of Built"
          min="1900"
          max={new Date().getFullYear()}
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          onInput={(e) => {
            const target = e.target as HTMLInputElement; // Приведение типа
            if (target.value.length > 4) {
              target.value = target.value.slice(0, 4);
            }
          }}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Current status:</label>
        <select
          name="currentStatus"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue="unknown"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="in port">In Port</option>
          <option value="on the way">On the Way</option>
          <option value="waiting">Waiting</option>
          <option value="fix">Fix</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <button
          
          type="submit"
          className="w-40 bg-gray-400 text-white py-2 rounded-md hover:bg-black transition duration-150"
        >
          Submit
        </button>
      </div>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}