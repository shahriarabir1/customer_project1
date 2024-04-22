"use client";
import axios from "axios";
import React, { useState } from "react";
interface FormData {
  name: string;
  phone: string;
  city: string;
}

const page = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    phone: "",
    city: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/customers", data);
      console.log("Submitted Successfully", response.data);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };
  return (
    <div className="flex flex-col items-center mt-20 gap-5">
      <h3 className="font-bold text-2xl">Enter your information</h3>
      <br />
      <form className="flex flex-col w-fit gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-x-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={data.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            value={data.phone}
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-x-7">
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={data.city}
            name="city"
            onChange={handleChange}
          />
        </div>

        <div className="py-3 bg-lime-700 flex justify-center hover:bg-lime-500 hover:text-black">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default page;
