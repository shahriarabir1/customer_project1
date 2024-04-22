"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface FormData {
  name: string;
  phone: string;
  city: string;
}

interface CustomerData {
  id: number;
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
  const [customers, setCustomers] = useState<CustomerData[]>([]); // Array to store fetched data

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

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/customers");
      setCustomers(response.data as CustomerData[]);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-20 gap-5">
      {customers.length > 0 && (
        <div className="mt-5">
          <h2>Fetched Customers</h2>
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>
                {customer.name} - {customer.phone} ({customer.city})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default page;
