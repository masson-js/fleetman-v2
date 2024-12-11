import { getAllCertifications } from "@/actions/certification";
import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";

export default async function ShipCardCertification() {
  const certifications = (await getAllCertifications()) || [];
  const userShips = (await getAllUserShips()) || [];

  return (
    <section className=" flex flex-col w-auto justify-start ">
    <h1 className="text-3xl mb-4 italic border-l-4 border-blue-400 pl-2 ">
      Certifications
    </h1>
    <div className="flex flex-col w-auto h-auto gap-4 flex-wrap">
      
      {userShips.map((ship) => {
        const shipCertifications = certifications.filter(
          (certification) => certification.shipId === ship.id
        );
        return (
          <div
            key={ship.id}
            className="flex p-6 flex-col h-auto w-auto bg-white hover:bg-blue-100"
          >
             <Link href={`/status/${ship.id}`}><h1 className="italic text-3xl">{ship.name}</h1></Link>
            <div className="flex flex-row flex-wrap gap-4 mt-2">
              <h2 className="font-thin text-sm">Type: {ship.type}</h2>
              <h2 className="font-thin text-sm">IMO: {ship.imoNumber}</h2>
            </div>
            <div className="flex flex-row items-start">
              {shipCertifications.length === 0 ? (
                <p className=" text-gray-500 mt-4">
                  No certifications available for this ship.
                </p>
              ) : (
                <h3 className="font-bold mt-4">Certifications:</h3>
              )}
              <div className="flex flex-col ml-2 mt-4 flex-wrap border-l-4 border-blue-400">
                {shipCertifications.map((certification) => (
                  <Link
                    key={certification.id}
                    href={`/certifications/${certification.id}`}
                  >
                    <div className="flex flex-row w-auto ml-2 text-sm justify-center hover:underline">
                      <p className="w-20 text-center">
                        {new Date(certification.issuedDate).toLocaleDateString(
                          "en-US"
                        )}
                      </p>
                      <p className="w-20 text-center">
                        {certification.issuingAuthority}
                      </p>
                      <p className="w-11 text-center">{certification.standard}</p>
                      <p className="w-40 font-semibold ml-4">
                        Inspector: {certification.inspectorName}
                      </p>
                      <p className="w-40 font-semibold ml-4">
                        Company: {certification.certificationCompany}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </section>
  );
}
