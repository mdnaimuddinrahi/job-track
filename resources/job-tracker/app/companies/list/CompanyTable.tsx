"use client";

import { useState } from "react";

export default function CompanyTable() {
  
  const data = [
    {
      name: "Korrie O'Crevy",
      email: "kocrev0@thetimes.co.uk",
      date: "09/23/2016",
      exp: "1 Year",
      age: 61,
    },
    {
      name: "Eileen Diehn",
      email: "ediehn6@163.com",
      date: "10/15/2017",
      exp: "9 Years",
      age: 59,
    },
  ];

  return (
      <div className="p-3">
        <table className="w-full border-collapse overflow-x-auto">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="p-3 text-left text-xs font-semibold">NAME</th>
              <th className="p-3 text-left text-xs font-semibold">EMAIL</th>
              <th className="p-3 text-left text-xs font-semibold">DATE</th>
              <th className="p-3 text-left text-xs font-semibold">EXPERIENCE</th>
              <th className="p-3 text-left text-xs font-semibold">AGE</th>
            </tr>

          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-3 text-sm">{row.name}</td>
                <td className="p-3 text-sm">{row.email}</td>
                <td className="p-3 text-sm">{row.date}</td>
                <td className="p-3 text-sm">{row.exp}</td>
                <td className="p-3 text-sm">{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
