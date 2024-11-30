"use client";

import { registration } from "@/actions/registration";
import Link from "next/link";
import { useActionState } from "react";

export default function RegistrationForm() {
  const [state, formAction] = useActionState<any, FormData>(
    registration,
    undefined
  );

  return (
    <div className="flex flex-col relative  w-full h-screen items-center justify-center bg-gray-100 text-gray-800">
      <form
        action={formAction}
        className="z-10 bg-white p-8 rounded-lg  text-gray-700 flex flex-col items-center gap-6 w-80 max-w-full"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Registration</h2>

        <input
          type="text"
          name="username"
          required
          placeholder="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-black transition duration-150"
        >
          Submit
        </button>
        {state?.error && <p>{state.error}</p>}
      </form>
      <div className="z-10 bg-white px-8 pb-8 rounded-lg text-gray-700 flex flex-col items-center gap-6 w-80 max-w-full">
        <h2 className="text-black">Dont have an Account?</h2>
        <button className="w-full mx-14 bg-gray-500 text-white py-2 rounded-md hover:bg-black transition duration-150">
          <Link href="/registration">Sign Up</Link>
        </button>
        <h2 className="text-black">or</h2>
        <button className="w-full mx-14 bg-gray-400 text-white py-2 rounded-md hover:bg-black transition duration-150">
          <Link href="/">Go to Home Page</Link>
        </button>
      </div>
    </div>
  );
}
