"use client";
import { createCertification } from "@/actions";
import { useActionState } from "react";

interface ShipsGetProps {
  shipsNames: string[];
}

export default function AddCertifcationForm({ shipsNames }: ShipsGetProps) {
  const [state, formAction] = useActionState<any, FormData>(
    createCertification,
    undefined
  );

  return (
    <form
      action={formAction}
      className="flex flex-col bg-white p-6 ml-12 mt-6 rounded-lg text-gray-700 gap-4 w-1/2 items-center"
    >
      <h2 className="flex justify-center font-semibold mt-4 mb-2">
        Add Certification to the Ship
      </h2>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Select your ship:</label>
        <select
          name="shipName"
          required
          className=" w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          defaultValue=""
        >
          {shipsNames.map((shipName) => (
            <option value={shipName} key={shipName}>
              {shipName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Inspector Name / Position:</label>
        <input
          type="text"
          name="inspectorName"
          placeholder="ex. Jhon Dor / Surveyor"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Certification Company:</label>
        <input
          type="text"
          name="certificationCompany"
          placeholder="Enter certification company name"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Certification type:</label>

        <select
          name="type"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option disabled>select certification type</option>
          <option value="itc">International Tonnage Certificate (ITC)</option>
          <option value="illc">
            International Load Line Certificate (ILLC)
          </option>
          <option value="iopp">
            International Oil Pollution Prevention Certificate (IOPP)
          </option>
          <option value="iapp">
            International Air Pollution Prevention Certificate (IAPP)
          </option>
          <option value="isppc">
            International Sewage Pollution Prevention Certificate (ISPPC)
          </option>
          <option value="ibwmc">
            International Ballast Water Management Certificate (IBWMC)
          </option>
          <option value="ism">
            International Safety Management Certificate (ISM)
          </option>
          <option value="issc">
            International Ship Security Certificate (ISSC)
          </option>
          <option value="doc">Document of Compliance (DOC)</option>
          <option value="smc">Safety Management Certificate (SMC)</option>
          <option value="eedi">
            Energy Efficiency Certificate (EEDI/EEXI)
          </option>
          <option value="polar">Polar Ship Certificate</option>
          <option value="class">Class Certificate</option>
          <option value="machinery">Machinery Certificate</option>
          <option value="hull">Hull Certificate</option>
          <option value="mrv">
            EU Monitoring, Reporting, and Verification (MRV) Certificate
          </option>
          <option value="green-passport">
            Green Passport (Inventory of Hazardous Materials)
          </option>
          <option value="sulfur">EU Sulfur Cap Compliance Certificate</option>
          <option value="nox">NOx Compliance Certificate</option>
          <option value="mlc">Maritime Labour Certificate (MLC)</option>
          <option value="passenger">Passenger Ship Safety Certificate</option>
          <option value="crew">Crew Certificate of Competency</option>
          <option value="lng">LNG Fuel Certificate</option>
          <option value="cargo-safety">
            Cargo Ship Safety Equipment Certificate
          </option>
          <option value="dangerous-goods">Dangerous Goods Certificate</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Issue Date:</label>
        <input
          type="date"
          name="issuedDate"
          min="2000-01-01"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Issuing Authority:</label>
        <select
          name="issuingAuthority"
          defaultValue=""
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled>
            Select issuing authority
          </option>
          <option value="mca">
            United Kingdom Maritime and Coastguard Agency (MCA)
          </option>
          <option value="bsh">
            Germany: Bundesamt für Seeschifffahrt und Hydrographie (BSH)
          </option>
          <option value="dam">
            France: Direction des Affaires Maritimes (DAM)
          </option>
          <option value="ilt">
            Netherlands: Inspectie Leefomgeving en Transport (ILT)
          </option>
          <option value="dgmm">
            Spain: Dirección General de la Marina Mercante (DGMM)
          </option>
          <option value="mit">
            Italy: Ministero delle Infrastrutture e dei Trasporti
          </option>
          <option value="dnv">DNV (Det Norske Veritas)</option>
          <option value="lr">Lloyd's Register (LR)</option>
          <option value="bv">Bureau Veritas (BV)</option>
          <option value="rina">RINA (Registro Italiano Navale)</option>
          <option value="gl">Germanischer Lloyd (GL)</option>
          <option value="abs">ABS (American Bureau of Shipping)</option>
          <option value="classnk">ClassNK (Nippon Kaiji Kyokai)</option>
          <option value="emsa">European Maritime Safety Agency (EMSA)</option>
          <option value="psc">Port State Control (PSC)</option>
          <option value="malta-registry">Malta Ship Registry</option>
          <option value="cyprus-registry">Cyprus Ship Registry</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Compliance Standards:</label>
        <select
          name="standard"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Select compliance standards</option>
          <option value="MARPOL">MARPOL</option>
          <option value="SOLAS">SOLAS</option>
          <option value="ISO">ISO</option>
          <option value="AFS">AFS</option>
          <option value="SEEMP">SEEMP</option>
          <option value="EEDI">EEDI</option>
          <option value="ISM">ISM</option>
          <option value="MLC 2006">MLC 2006</option>
          <option value="STCW">STCW</option>
          <option value="IMDG">IMDG</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Compliance Level:</label>
        <select
          name="complianceLevel"
          defaultValue=""
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled>
            Select compliance level
          </option>
          <option value="full">Full</option>
          <option value="temporary">Temporary</option>
          <option value="limited">Limited</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Verification Date:</label>
        <input
          type="date"
          name="verificationDate"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Certificate Number:</label>
        <input
          type="text"
          name="certificateNumber"
          required
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="Enter certificate number"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Inspection Requirements:</label>
        <textarea
          name="inspectionRequirements"
          rows={4}
          placeholder="Enter inspection requirements"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Next Inspection Date:</label>
        <input
          type="date"
          name="nextInspectionDate"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Expiry Date:</label>
        <input
          type="date"
          name="expiryDate"
          min="2000-01-01"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="flex flex-wrap items-center">
        <label className="font-sans w-40 m-2">Remarks:</label>
        <textarea
          name="remarks"
          placeholder="Enter additional remarks"
          className="w-80 border m-2 p-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-40 m-6 bg-gray-400 text-white py-2 rounded-md hover:bg-black transition duration-150"
      >
        Submit
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
