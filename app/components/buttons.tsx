"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions";

const buttonStyle =
  "w-24 h-12 border-2 rounded-lg font-bold text-center text-gray-800 border-gray-400 hover:bg-gray-500 hover:border-gray-500 hover:text-gray-100 transition duration-100 hover:duration-500 ease-in-out ";

export function LoginButton() {
  return (
    <Link href="/login">
      <button className={buttonStyle}>Log in</button>
    </Link>
  );
}

export function RegistrationButton() {
  return (
    <Link href="/registration">
      <button className={buttonStyle}>Sign up</button>
    </Link>
  );
}

export function TryDemoButton() {
  return (
    <Link href="/status">
      <button className={buttonStyle}>Try Demo</button>
    </Link>
  );
}

export function UserButton() {
  return (
    <Link href="/status">
      <button className={buttonStyle}>Try User</button>
    </Link>
  );
}

export function StatusEnhancedButton({ imoNumber, children }: any) {
  const router = useRouter();
  function handleClick() {
    router.push(`/status/${imoNumber}`);
  }
  return (
    <button style={{ cursor: "pointer" }} onClick={handleClick}>
      {children}
    </button>
  );
}

export function LogOut() {
  return (
    <form action={logout}>
      <button className={buttonStyle}>Log out</button>
    </form>
  );
}

export function AddShipButton() {
  return (
    <button className="flex m-2 px-2 justify-start hover:underline">
      <Link href="/forms/ship">Add Ship</Link>
    </button>
  );
}

export function AddInspectionButton() {
  return (
    <button className="bg-gray-500 hover:bg-gray-700 h-12 mt-6 w-48 text-white font-bold py-2 px-4 rounded text-sm">
      <Link href="/forms/inspection">Add Inspection to ship</Link>
    </button>
  );
}

export function InspectionEnhancedButton({ inspectionId, children }: any) {
  const router = useRouter();
  function handleClick() {
    router.push(`/inspections/${inspectionId}`);
  }
  return (
    <button style={{ cursor: "pointer" }} onClick={handleClick}>
      {children}
    </button>
  );
}

export function CertificationEnhancedButton({ inspectionId, children }: any) {
  const router = useRouter();
  function handleClick() {
    router.push(`/certification/${inspectionId}`);
  }
  return (
    <button style={{ cursor: "pointer" }} onClick={handleClick}>
      {children}
    </button>
  );
}
export function LogbookEnhancedButton({ logbookId, children }: any) {
  const router = useRouter();
  function handleClick() {
    router.push(`/logbooks/${logbookId}`);
  }
  return (
    <button style={{ cursor: "pointer" }} onClick={handleClick}>
      {children}
    </button>
  );
}
