"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [datas, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: datas.email,
        password: datas.password,
      });

      if (data) {
        console.log(data);
        router.push("/login");
      } else {
        console.error("Registration failed:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...datas,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto w-[400px] flex flex-col gap-8 mt-5">
      <div className="grid">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={datas?.email}
          className="text-black pl-3"
        />
      </div>
      <div className="grid">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={datas?.password}
          className="text-black pl-3"
        />
      </div>
      <div>
        <button
          onClick={login}
          className="bg-blue-900 p-3 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default page;
