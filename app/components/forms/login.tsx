"use client";

import { login } from "@/actions/login";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction] = useActionState<any, FormData>(login, undefined);

  return (
    <div className="flex flex-col w-auto h-auto mt-6 justify-center  text-gray-800 gap-2 font-mono">
      <form
        action={formAction}
        className="z-10 bg-[rgba(255,255,255,0.3)] p-8 rounded-lg  text-gray-700 flex flex-col items-center gap-4 w-auto max-w-full reveal"
      >
        <h2 className="text-lg font-semibold text-gray-800">Login</h2>

        <input
          type="text"
          name="username"
          required
          placeholder="username"
          className="w-full px-4 py-2 text-sm border border-[#57C4FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4dc1ff] items-center text-center"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="password"
          className="w-full px-4 py-2 text-sm border border-[#57C4FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4dc1ff] items-center text-center"
        />
        <button
          type="submit"
          className="w-full bg-[#57C4FF] text-white py-2 text-sm rounded-md hover:bg-[#09A9FF] transition duration-150"
        >
          Submit
        </button>
        {state?.error && <p>{state.error}</p>}
        <Link
          className="w-full mx-14 bg-[#9757ff] hover:bg-[#8742f6] text-white py-2 rounded-md transition duration-150 flex hover:cursor-pointer justify-center items-center text-center text-sm"
          href="/pages/passwordrecover"
        >
          I forgot password
        </Link>
      </form>
      <div className="z-10 bg-[rgba(255,255,255,0.3)] px-8 pb-8 rounded-lg text-gray-700 flex flex-col items-center gap-6 w-80 max-w-full reveal">
        <h2 className="text-black mt-4 text-sm items-center text-center">
          Dont have an Account?
        </h2>

        <Link
          className="w-full mx-14 bg-[#ff5795] hover:bg-[#ec4b86] text-white py-2 rounded-md transition duration-150 flex hover:cursor-pointer justify-center items-center text-center text-sm"
          href="/client/registration"
        >
          Sign Up
        </Link>

        <Link
          className="w-full mx-14 bg-[#4e7bf4] hover:bg-[#335bc9]  text-white py-2 rounded-md transition duration-150 hover:cursor-pointer justify-center items-center text-center text-sm"
          href="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
