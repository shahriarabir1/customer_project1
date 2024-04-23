"use client";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface SessionData {
  expires_in?: number;
}
const page = () => {
  const router = useRouter();
  const [expirationTime, setExpirationTime] = useState<number | null>(null);

  const checkTokenExpiration = () => {
    const expiresAt = localStorage.getItem("expires_in");
    if (expiresAt) {
      const expirationTime = parseInt(expiresAt, 10);
      if (Date.now() > expirationTime) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const storedExpirationTime = localStorage.getItem("supabase_expiration");
    const now = Date.now();

    if (storedExpirationTime && parseInt(storedExpirationTime) > now) {
      setExpirationTime(parseInt(storedExpirationTime));
    } else {
      localStorage.clear();
    }
  }, []);

  const [datas, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: datas.email,
        password: datas.password,
      });
      if (data) {
        const accessToken = data.session?.access_token ?? "";

        localStorage.setItem("access_token", accessToken);
        const expiresIn = (data as SessionData).expires_in || 3600; // Default to 3600 seconds if not provided

        const expirationTimestamp = Date.now() + expiresIn * 1000;
        setExpirationTime(expirationTimestamp);
        localStorage.setItem(
          "supabase_expiration",
          expirationTimestamp.toString()
        );
        router.push("/");
      } else {
        console.log(error);
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
          Login
        </button>
      </div>
      <Link href="/signup" className="underline hover:text-red-600">
        Create new Account?
      </Link>
    </div>
  );
};

export default page;
