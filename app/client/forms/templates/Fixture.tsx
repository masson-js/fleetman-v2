"use client";

import { createFixture } from "@/actions/fixture";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { Check } from "lucide-react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function NewAddFixtureForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createFixture,
    undefined
  );
  const router = useRouter();

  const [displayValue, setDisplayValue] = useState("");
  const [realValue, setRealValue] = useState("");
  const [fixtureCurrency, setFixtureCurrency] = useState<string[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<string[]>([]);
  const [charterTypes, setChartTypes] = useState<string[]>([]);
  const [charterStatus, setChartStatus] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/lists/fixtureCurrency.json").then((res) => res.json()),
      fetch("/lists/fixturePaymentTerms.json").then((res) => res.json()),
      fetch("/lists/fixtureCharterTypes.json").then((res) => res.json()),
      fetch("/lists/fixtureCharterStatus.json").then((res) => res.json()),
    ])
      .then(
        ([
          cureencyData,
          paymentTermsData,
          CharterTypesData,
          CharterStatusData,
        ]) => {
          setFixtureCurrency(cureencyData.currencies || []);
          setPaymentTerms(paymentTermsData.paymentTerms || []);
          setChartTypes(CharterTypesData.charterTypes || []);
          setChartStatus(CharterStatusData.statuses || []);
        }
      )
      .catch((error) => console.error("Error loading data:", error));
  }, []);

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
          Fixed successfully
        </h2>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col bg-white mt-24 mb-24 pb-20 rounded-lg shadow-md text-black w-4/6 gap-4 items-center border-2 border-solid border-white hover:border-[#59c5ff87] hover:shadow-xl transition-opacity duration-500 opacity-0 animate-fade-in "
    >
      <h2 className="flex justify-center font-bold mt-6 mb-2  border-b-2 border-[#e81416]">
        Add Charter to the Ship
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

      {/* Charterer Name */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="chartererName"
          placeholder="Charterer Name"
          pattern="^[A-Za-z\s]+$"
          maxLength={50}
          minLength={3}
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^A-Za-z\s]/g, "");
          }}
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          required
          min="2000-01-01"
          max={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      {/* End Date */}
      <div className="flex flex-wrap items-center flex-col">
        <label className="font-extralight text-xs  border-b-2 border-[#3fbcff76]">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          required
          min={new Date().toISOString().slice(0, 10)}
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          onFocus={(e) => e.target.showPicker()}
        />
      </div>

      {/* Total Cost */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          inputMode="numeric"
          placeholder="Total Cost"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
        <input type="hidden" name="totalCost" value={realValue} />
      </div>

      {/* Currency */}
      <div className="flex flex-wrap items-center">
        <select
          name="currency"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Select Currency
          </option>
          {fixtureCurrency.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="paymentTerms"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Select payment terms
          </option>
          {paymentTerms.map((terms) => (
            <option key={terms} value={terms}>
              {terms}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <select
          name="fixtureType"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Charter Type
          </option>
          {charterTypes.map((types) => (
            <option key={types} value={types}>
              {types}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center">
        <select
          name="status"
          required
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
          defaultValue=""
        >
          <option value="" disabled>
            Charter Status
          </option>
          {charterStatus.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Delivery Location */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="deliveryLocation"
          placeholder="Delivery Location ex.- Country/City (if applicable)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <textarea
          name="cargoDescription"
          rows={2}
          placeholder="Cargo Description (if applicable)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Broker Name */}
      <div className="flex flex-wrap items-center">
        <input
          type="text"
          name="brokerName"
          placeholder="Broker Name (if applicable)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Cancellation Terms */}
      <div className="flex flex-wrap items-center">
        <textarea
          name="cancellationTerms"
          rows={3}
          placeholder="Cancellation Terms (if applicable)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
        />
      </div>

      {/* Notes */}
      <div className="flex flex-wrap items-center">
        <textarea
          name="notes"
          rows={3}
          placeholder="Any Additional Notes (if applicable)"
          className="font-extralight text-xs w-80 border-2 border-solid border-[#3fbcff61] hover:border-[#3fbcff] m-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3fbcff] focus:border-white transform transition-all duration-300"
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
