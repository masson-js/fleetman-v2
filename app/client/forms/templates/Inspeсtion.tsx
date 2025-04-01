"use client";
import { createInspection } from "@/actions/inspection";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewAddInspectionForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createInspection,
    undefined
  );
  const router = useRouter();
  const [isEUCompliance, setIsEUCompliance] = useState(false);
  const [inspectionTypes, setInspectionTypes] = useState<string[]>([]);
  const [complianceStandards, setComplianceStandards] = useState<string[]>([]);
  const [inspectionStatus, setInspectionStatus] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/lists/inspectionTypes.json").then((res) => res.json()),
      fetch("/lists/complianceStandards.json").then((res) => res.json()),
      fetch("/lists/inspectionVerificationStatus.json").then((res) =>
        res.json()
      ),
    ])
      .then(([inspectionData, complianceData, statusData]) => {
        setInspectionTypes(inspectionData.types || []);
        setComplianceStandards(complianceData.complianceStandards || []);
        setInspectionStatus(statusData.inspectionStatus || []);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const handleEUComplianceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEUCompliance(e.target.checked);
  };

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
          Inspection created successfully
        </h2>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:border-2 hover:border-solid hover:shadow-xl transform transition-all duration-300 animate-fade-in"
    >
      <h2 className="flex justify-center font-bold mt-6 mb-2  border-b-2 border-[#ffa500]">
        Add Inspetion to the Ship
      </h2>
      <div className="flex flex-wrap items-center">
        <select
          name="shipName"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Select your ship
          </option>
          {shipsNames.map((shipName) => (
            <option value={shipName} key={shipName}>
              {shipName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="inspectorName"
          required
          placeholder="Inspector"
          maxLength={50}
          minLength={3}
          pattern="^[A-Za-z\s]+$"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^A-Za-z\s]/g, "");
          }}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="inspectionType"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Select type
          </option>
          {inspectionTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="complianceStandards"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Select Standard
          </option>
          {complianceStandards.map((standard, index) => (
            <option key={index} value={standard}>
              {standard}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap flex-col items-center">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Start Date
        </label>
        <input
          type="date"
          name="inspectionDate"
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Duration
        </label>
        <input
          type="time"
          name="duration"
          required
          step="60"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      <div className="flex flex-col flex-wrap items-center">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Next Inspection
        </label>
        <input
          type="date"
          name="nextInspectionDate"
          min={new Date().toISOString().slice(0, 10)}
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      <div className="flex flex-wrap items-center">
        <textarea
          name="recommendations"
          placeholder="Recommendations (if any)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        ></textarea>
      </div>

      <div className="flex flex-wrap items-center">
        <input
          type="url"
          name="inspectionReport"
          placeholder="Link to inspection report"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <textarea
          name="deficienciesFound"
          placeholder="Describe deficiencies (if any)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        ></textarea>
      </div>
      <div className="flex flex-wrap items-center">
        <textarea
          name="correctiveActions"
          placeholder="Describe corrective actions (if needed)"
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        ></textarea>
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="verificationStatus"
          required
          className="font-extralight text-xs w-80 border-2  border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue="unknown"
        >
          <option value="" disabled>
            Verification Status
          </option>
          {inspectionStatus.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center m-2">
        <label className="font-sans text-sm w-40">EU Compliance:</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isEUCompliance"
            checked={isEUCompliance}
            onChange={handleEUComplianceChange}
            className="checkbox appearance-none border-2 border-gray-300 rounded-lg w-5 h-5 mr-2 cursor-pointer transition-all duration-300 ease-in-out checked:bg-[#3fbcff] checked:border-[#3fbcff] checked:ring-2 checked:ring-[#3fbcff] focus:outline-none"
          />
          <span className="text-sm text-gray-700">Yes</span>
        </div>
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
