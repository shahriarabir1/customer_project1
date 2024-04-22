import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <p>Do you want to add a customer</p>
      <Link href="/add">
        <button>Add New</button>
      </Link>
    </div>
  );
};

export default page;
