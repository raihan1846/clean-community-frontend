import React from "react";

const CommunityStatus = ({ userCount = 0, statusCounts = {} }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center bg-gradient-to-r from-blue-600 to-green-600 p-12 mt-20 rounded-xl text-white shadow-lg">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-6xl font-bold">{userCount}</h2>
        <p className="text-2xl mt-2">Registered Users</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-6xl font-bold">
          {statusCounts.Resolved || 0}
        </h2>
        <p className="text-2xl mt-2">Issues Resolved</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-6xl font-bold">
          {statusCounts.Pending || 0}
        </h2>
        <p className="text-2xl mt-2">Pending Issues</p>
      </div>
    </div>
  );
};

export default CommunityStatus;
