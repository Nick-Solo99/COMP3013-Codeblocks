"use client";

import { useState } from "react";
import { authClient } from "@/app/utils/auth-client";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: "https://avatar.iran.liara.run/public",
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
        },
        onSuccess: (ctx) => {
          console.log(ctx);
          redirect("/");
        },
        onError: (ctx) => {
          console.log(ctx);
        },
      },
    );
  }

  return (
    <div className="card bg-base-200 m-10 items-center">
      <h2 className="text-4xl text-primary font-semibold text-center mt-2">
        Register
      </h2>
      <div className="card-body mt-0 pt-0">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset flex flex-col border border-primary rounded-2xl p-4 w-xl">
            <legend className="fieldset-legend">Register</legend>
            <label className="label">Email:</label>
            <input
              type="email"
              className="input w-xl"
              placeholder="Email"
              name="email"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <label>Name:</label>
            <input
              className="input w-xl"
              type="text"
              placeholder="Name"
              name="name"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
            <label className="label">Password:</label>
            <input
              type="password"
              className="input w-xl"
              placeholder="Password"
              name="password"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <button className="btn btn-info btn-outline w-xl mt-4">
              Register
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
