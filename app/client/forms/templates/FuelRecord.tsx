"use client";
//
import { creatFuelRecord } from "@/actions/fuel";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewFuelRecordForm({ shipsNames }: ShipsGetProps) {
  const router = useRouter();

  const [state, formAction] = useActionState<any, FormData>(
    creatFuelRecord,
    undefined
  );
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [fuelType, setFuelType] = useState<string[]>([]);
  const [displayValue, setDisplayValue] = useState("");
  const [realValue, setRealValue] = useState("");

  const formatNumberWithSpaces = (value: string) => {
    return Number(value).toLocaleString("fr-FR");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");

    if (inputValue) {
      setRealValue(inputValue);
      setDisplayValue(formatNumberWithSpaces(inputValue));
    } else {
      setRealValue("");
      setDisplayValue("");
    }
  };

  useEffect(() => {
    Promise.all([fetch("/lists/fuelTypes.json").then((res) => res.json())])
      .then(([FuelTypeData]) => {
        setFuelType(FuelTypeData.fuelTypes || []);
      })

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
      <div className="flex flex-col h-60 w-60 items-center bg-white justify-center mt-24 mb-24 p-10">
        <Check color="green" size={64} className="mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center">
          Fuel record created successfully
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
        Add New Fuel Record
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
      <div className="flex flex-wrap items-center">
        <select
          name="fuelType"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Fuel Type
          </option>
          {fuelType.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="number"
          name="amount"
          required
          placeholder="Fuel Amount (in tons)"
          step="1"
          min="0"
          max="1000000"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          required
          value={displayValue}
          onChange={handleChange}
          placeholder="Price per unit of fuel"
          step="1"
          min="0"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
        <input type="hidden" name="price" value={realValue} />
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
