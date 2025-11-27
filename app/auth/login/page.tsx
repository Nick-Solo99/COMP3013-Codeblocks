"use client";

import { useState } from "react";
import { authClient } from "@/app/utils/auth-client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });
  }

  return (
    <div className="card bg-base-200 m-10 items-center">
      <h2 className="text-4xl text-primary font-semibold text-center mt-2">
        Login
      </h2>
      <div className="card-body mt-0 pt-0">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset flex flex-col border border-primary rounded-2xl p-4 w-xl">
            <legend className="fieldset-legend">Login</legend>
            <label className="label">Email:</label>
            <input
              type="email"
              className="input w-xl"
              placeholder="Email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Password:</label>
            <input
              type="password"
              className="input w-xl"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-primary-content">
              Dont have an account?{" "}
              <Link className="link link-secondary" href="/auth/register">
                Register Now.
              </Link>
            </span>
            <button className="btn btn-info btn-outline w-xl mt-4">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
