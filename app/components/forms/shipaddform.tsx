"use client";
import { createShip } from "@/actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function ShipAddForm() {
  const [state, formAction] = useActionState<any, FormData>(
    createShip,
    undefined
  );
  const router = useRouter();

  function navHandler() {
    router.push("/status");
  }
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
          placeholder="82"
          required
         className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        </div>
          
        <div>
        <input
          type="number"
          name="length"
          required
          placeholder="length"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="width"
          required
          placeholder="width"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Ship Identification
      </h2>
      <div className="flex flex-row justify-center gap-4 w-full">
        <input
          type="number"
          name="mmsi"
          required
          placeholder="MMSI"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="imoNumber"
          required
          placeholder="IMO"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="callsign"
          placeholder="Callsign"
          required
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Registration and Status
      </h2>
      <div className="flex flex-row justify-center gap-4 w-full">
        <input
          type="text"
          name="ecoStandard"
          required
          placeholder="ECO standard"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="portOfRegistry"
          required
          placeholder="port of registry"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="yearBuilt"
          required
          placeholder="Год постройки"
          min="1900"
          max={new Date().getFullYear()}
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          onInput={(e) => {
            const target = e.target as HTMLInputElement; // Приведение типа
            if (target.value.length > 4) {
              target.value = target.value.slice(0, 4);
            }
          }}
        />
        <select
          name="currentStatus"
          required
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue="" // Значение по умолчанию для пустого плейсхолдера
        >
          <option value="" disabled>
            Выберите статус
          </option>
          <option value="in port">In Port</option>
          <option value="on the way">On the Way</option>
          <option value="waiting">Waiting</option>
          <option value="fix">Fix</option>
        </select>
      </div>

      <button
        onClick={() => navHandler()}
        type="submit"
        className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-black transition duration-150"
      >
        Submit
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
