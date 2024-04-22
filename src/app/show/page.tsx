"use client";
import Temperature from "@/component/Temperature";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface CustomerData {
  id: number;
  name: string;
  phone: string;
  city: string;
}

const page = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchText)
  );

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
      <input
        className="border border-gray-300 rounded p-2 mb-4 text-black"
        type="text"
        placeholder="Search by Name"
        value={searchText}
        onChange={handleSearch}
      />
      <table className="table-fixed border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">City</th>
            <th className="px-4 py-2 text-left">Temperature</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-2 border-b border-gray-200 text-left">
                  {customer.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-left">
                  {customer.phone}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-left">
                  {customer.city}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-left">
                  <Temperature city={customer.city} />
                </td>
              </tr>
            ))
          ) : (
            <tr key="no-results">
              <td colSpan={4} className="text-center py-4">
                No results found for "{searchText}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default page;
