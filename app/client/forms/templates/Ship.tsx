"use client";
import { createShip } from "@/actions/ship";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

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
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          countriesRes,
          shipTypesRes,
          ecoStandartRes,
          currentStatusRes,
          yearsRes,
        ] = await Promise.all([
          fetch("/lists/countries.json"),
          fetch("/lists/shiptypes.json"),
          fetch("/lists/ecostandart.json"),
          fetch("/lists/currentstatus.json"),
          fetch("/lists/years.json"),
        ]);

        const [
          countriesData,
          shipTypesData,
          ecoStandartData,
          currentStatusData,
          yearsData,
        ] = await Promise.all([
          countriesRes.json(),
          shipTypesRes.json(),
          ecoStandartRes.json(),
          currentStatusRes.json(),
          yearsRes.json(),
        ]);

        setCountries(countriesData.countries || []);
        setShipTypes(shipTypesData.shipTypes || []);
        setEcoStandart(ecoStandartData.ecoStandards || []);
        setCurrentStatus(currentStatusData.statuses || []);
        setYears(yearsData.years || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

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
      <div className="flex flex-col h-60 w-60 items-center bg-white justify-center mt-24 mb-24 rounded-full shadow-md p-10">
        <Check color="green" size={64} className="mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center justify-center items-center ">
          Ship created successfully
        </h2>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
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
      {/* Port of Registry */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="portOfRegistry"
          required
          placeholder="Port of Registry"
          maxLength={50}
          pattern="^[A-Za-z0-9\s\-]+$"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      {/* MMSI */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="mmsi"
          placeholder="MMSI"
          required
          pattern="\d{9}"
          maxLength={9}
          minLength={9}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, "");
            if (target.value.length > 9) {
              target.value = target.value.slice(0, 9);
            }
          }}
        />
      </div>

      {/* IMO Number */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="imoNumber"
          placeholder="IMO"
          required
          pattern="\d{7}"
          maxLength={7}
          minLength={7}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, "");
            if (target.value.length > 7) {
              target.value = target.value.slice(0, 7);
            }
          }}
        />
      </div>

      {/* Callsign */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="callsign"
          placeholder="Callsign"
          required
          pattern="^[A-Z0-9]{3,7}$"
          maxLength={7}
          minLength={3}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (target.value.length > 7) {
              target.value = target.value.slice(0, 7);
            }
          }}
        />
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
          min="0.3"
          max="100"
          pattern="\d*"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9.]/g, "");
            if (parseFloat(target.value) > 100) {
              target.value = "100";
            }
          }}
        />
      </div>

      {/* Length */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          step="0.1"
          name="length"
          placeholder="Length: (ft)"
          min="3"
          max="1500"
          pattern="\d*"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9.]/g, "");
            if (parseFloat(target.value) > 1500) {
              target.value = "1500";
            }
          }}
        />
      </div>

      {/* Width */}
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          step="0.1"
          name="width"
          placeholder="Width: (ft)"
          min="0.3"
          max="100"
          pattern="\d*"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9.]/g, "");
            if (parseFloat(target.value) > 100) {
              target.value = "100";
            }
          }}
        />
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
