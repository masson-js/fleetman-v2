"use client";
import { createShip } from "@/actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";





interface ShipsGetProps {
  shipsNames: string[];
}

export default function InspectionAddForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createShip,
    undefined
  );
  console.log(shipsNames)
  const router = useRouter();

  function navHandler() {
    router.push("/inspections");
  }
  return (
    <form
      action={formAction}
      className="flex flex-col bg-white p-6 m-6 rounded-lg text-gray-700 items-center gap-4 w-auto"
    >
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Ship Information
      </h2>
      <div className="flex flex-row justify-center gap-4 w-full">
        <input
          type="text"
          name="shipname"
          required
          placeholder="ship name"
          className="w-60 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="flag"
          required
          placeholder="flag"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          name="type"
          required
          placeholder="ship type"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Technical Specifications
      </h2>
      <div className="flex flex-row justify-center gap-4 w-full">
        <input
          type="number"
          name="deadweight"
          required
          placeholder="deadweight"
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="number"
          step="0.1"
          name="beam"
          placeholder="Beam"
          required
          className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
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


// inspectionDate     DateTime  // Дата проверки
//   inspectorName      String    // Имя проверяющего
//   inspectionType     String    // Тип проверки (напр., регулярная, внеплановая)
//   results            String    // Результаты проверки
//   recommendations    String?   // Рекомендации после проверки
//   nextInspectionDate DateTime? // Дата следующей проверки (если применимо)
//   inspectionReport   String?   // Ссылка на отчет о проверке (например, PDF-файл или URL)  
//   complianceStandards  String    // Стандарты, по которым проводилась проверка (MARPOL, SOLAS, ISO и т.д.)
//   deficienciesFound    String?   // Выявленные несоответствия
//   correctiveActions    String?   // Корректирующие действия для устранения недостатков
//   verificationStatus   String    // Статус проверки (например, "пройдено", "требуется доработка")
//   duration             Int?      // Продолжительность инспекции (в часах или минутах)
//   isEUCompliance       Boolean   /