"use client";

import { createCertification } from "@/actions/certification";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewAddCertifcationForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createCertification,
    undefined
  );

  const router = useRouter();
  const [certificationTypes, setCertificationTypes] = useState<string[]>([]);
  const [issuingAuthorities, setIssuingAuthorities] = useState<string[]>([]);
  const [complianceStandards, setComplianceStandards] = useState<string[]>([]);
  const [complianceLevels, setComplianceLevels] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/lists/certificationTypes.json").then((res) => res.json()),
      fetch("/lists/issuingAuthorities.json").then((res) => res.json()),
      fetch("/lists/complianceStandards.json").then((res) => res.json()),
      fetch("/lists/complianceLevels.json").then((res) => res.json()),
    ])
      .then(
        ([
          certifications,
          issuingAuthoritiesData,
          complianceData,
          complianceLevelsData,
        ]) => {
          setCertificationTypes(certifications.types || []);
          setIssuingAuthorities(issuingAuthoritiesData.issues || []);
          setComplianceStandards(complianceData.complianceStandards || []);
          setComplianceLevels(complianceLevelsData.levels || []);
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
      <div className="flex flex-col h-60 w-60 items-center bg-white  justify-center mt-24 mb-24  p-10">
        <Check color="green" size={64} className="mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center justify-center items-center ">
          Certificate created successfully
        </h2>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:shadow-xl transition-opacity duration-500 opacity-0 animate-fade-in"
    >
      <h2 className="flex justify-center font-bold mt-6 mb-2  border-b-2 border-[#79c314]">
        Add Certificate to the Ship
      </h2>
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
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^A-Za-z\s]/g, "");
          }}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="certificationCompany"
          placeholder="Certification Company"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="type"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Type
          </option>
          {certificationTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap flex-col items-center">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Issue Date
        </label>
        <input
          type="date"
          name="issuedDate"
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="issuingAuthority"
          defaultValue=""
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Issue Authority
          </option>
          {issuingAuthorities.map((issue, index) => (
            <option key={index} value={issue}>
              {issue}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="standard"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Standard
          </option>
          {complianceStandards.map((standard) => (
            <option key={standard} value={standard}>
              {standard}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="complianceLevel"
          defaultValue=""
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Compiliance Level
          </option>
          {complianceLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Verification Date:
        </label>
        <input
          type="date"
          name="verificationDate"
          required
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="certificateNumber"
          required
          placeholder="Certificate Number"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <textarea
          name="inspectionRequirements"
          rows={4}
          placeholder="Inspection Requirements"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      <div className="flex flex-wrap items-center flex-col ">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Next Inspection Date
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

      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Expiry Date
        </label>
        <input
          type="date"
          name="expiryDate"
          min={new Date().toISOString().slice(0, 10)}
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>
      <div className="flex flex-wrap items-center">
        <textarea
          name="remarks"
          placeholder="Enter Additional Remarks"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          rows={4}
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
