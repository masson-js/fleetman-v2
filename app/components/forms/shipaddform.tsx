"use client";
import { createShip, getSession } from "@/actions";
import { useActionState } from "react";

export default function ShipAddForm({ userName }: any) {
  const [state, formAction] = useActionState<any, FormData>(
    createShip,
    undefined
  );

  return (
    <div className="flex flex-col relative  w-full h-screen items-center mt-6 bg-gray-100 text-gray-800">
      <div className="flex flex-row m-4 gap-2">
        <p>Hi</p>
        <span>{userName}</span> <p>Let's add new ship</p>
      </div>
      <form
        action={formAction}
        className="z-10 bg-white p-8 rounded-lg  text-gray-700 flex flex-col items-center gap-6 w-80 max-w-full"
      >
        <input
          type="text"
          name="shipname"
          required
          placeholder="ship name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="flag"
          required
          placeholder="flag"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="type"
          required
          placeholder="type"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="portOfRegistry"
          required
          placeholder="port Of Registry"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="ecoStandard"
          required
          placeholder="eco Standard"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="imoNumber"
          required
          placeholder="imoNumber"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="deadweight"
          required
          placeholder="deadweight"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="length"
          required
          placeholder="length"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="width"
          required
          placeholder="width"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          name="yearBuilt"
          required
          placeholder="Год постройки"
          min="1900"
          max={new Date().getFullYear()}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
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
        <button
          type="submit"
          className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-black transition duration-150"
        >
          Submit
        </button>
        {state?.error && <p>{state.error}</p>}
      </form>
    </div>
  );
}
