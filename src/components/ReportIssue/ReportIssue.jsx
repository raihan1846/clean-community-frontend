import React from 'react';
import { FaTrash, FaTools, FaRoad, FaBuilding } from "react-icons/fa";

const ReportIssue = () => {
    const categories = [
        {
          name: "Garbage",
          icon: <FaTrash className="text-4xl text-green-500" />,
          bg: "bg-green-50",
        },
        {
          name: "Illegal Construction",
          icon: <FaBuilding className="text-4xl text-red-500" />,
          bg: "bg-red-50",
        },
        {
          name: "Broken Public Property",
          icon: <FaTools className="text-4xl text-yellow-500" />,
          bg: "bg-yellow-50",
        },
        {
          name: "Road Damage",
          icon: <FaRoad className="text-4xl text-blue-500" />,
          bg: "bg-blue-50",
        },
      ];

    return (
        <div className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Report by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`card shadow-lg p-6 rounded-xl hover:shadow-2xl transition cursor-pointer ${cat.bg}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {cat.icon}
                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <p classname="text-gray-600 text-sm">
                  Click to report an issue related to {cat.name}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default ReportIssue;