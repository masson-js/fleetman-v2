"use client";

import { createCrew } from "@/actions/crew";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewAddCrewForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createCrew,
    undefined
  );

  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [crewRole, setCrewRole] = useState<string[]>([]);
  const [memberStatus, setMemberStatus] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/lists/crewRole.json").then((res) => res.json()),
      fetch("/lists/crewMemberStatus.json").then((res) => res.json()),
      fetch("/lists/countries.json").then((res) => res.json()),
    ])
      .then(([crewRoleData, data, countriesData]) => {
        setCrewRole(crewRoleData.roles || []);
        setMemberStatus(data.crewMemberStatuses || []);
        setCountries(countriesData.countries || []);
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
      <div className="flex flex-col h-60 w-60 items-center bg-white  justify-center mt-24 mb-24  p-10">
        <Check color="green" size={64} className="mb-4" />
        <h2 className="text-xl font-bold text-green-600 text-center justify-center items-center ">
          Ship member created successfully
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
        Add New Crew Member
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
          {shipsNames.map((ship) => (
            <option value={ship} key={ship}>
              {ship}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="name"
          placeholder="Crew Member Name"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="nationality"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Nationality
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="role"
          defaultValue=""
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Role on the Ship
          </option>
          {crewRole.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Join Date
        </label>
        <input
          type="date"
          name="joinDate"
          required
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Contract End Date
        </label>
        <input
          type="date"
          name="contractEndDate"
          min={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="status"
          required
          defaultValue=""
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        >
          <option value="" disabled>
            Status
          </option>
          {memberStatus.map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <textarea
          name="qualifications"
          placeholder="Qualifications (optional)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          rows={3}
        />
      </div>

      <div className="flex flex-wrap items-center">
        <textarea
          name="certifications"
          placeholder="Certifications (optional)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          rows={3}
        />
      </div>
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Leave Date:
        </label>
        <input
          type="date"
          name="leaveDate"
          min={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
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
