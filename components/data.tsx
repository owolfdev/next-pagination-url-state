import React from "react";

import { fetchEmployees } from "@/lib/data";

async function Data({
  records,
  page,
  limit,
}: {
  records: number;
  page: number;
  limit: number;
}) {
  //
  const data = await fetchEmployees(page, limit);
  const employees = data.rows;

  return (
    <div className="flex flex-col gap-4 ">
      <div>Total Number of Records: {records}</div>
      {employees.length > 0 ? (
        employees.map((employee) => (
          <div
            key={employee.id}
            className="border rounded p-4 w-[360px] border-gray-500"
          >
            <p>First Name: {employee.first_name}</p>
            <p>Last Name: {employee.last_name}</p>
            <p>Email: {employee.email}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Data;
