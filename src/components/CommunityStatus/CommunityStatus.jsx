import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const CommunityStatus = () => {
    const [userCount, setUserCount] = useState(0);
    const [statusCounts, setStatusCounts] = useState({});

    useEffect(() => {
        fetch("http://localhost:3000/user-count")
            .then(res => res.json())
            .then(data => setUserCount(data.count));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/issues-status-count')
            .then(res => res.json())
            .then(data => setStatusCounts(data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className="grid grid-cols-1 shadow bg-gradient-to-r from-blue-500 to-green-700 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center bg-blue-500 p-12 mt-20 rounded-xl">
            <div>
                <h2 className="text-2xl font-bold">{userCount}</h2>
                <p>Registered Users</p>
            </div>
            <div>
                <h2 className="text-2xl font-bold">{statusCounts.Resolved || 0}</h2>
                <p>Issues Resolved</p>
            </div>
            <div>
                <h2 className="text-2xl font-bold">{statusCounts.Pending || 0}</h2>
                <p>Pending Issues</p>
            </div>
        </div>
    );
};

export default CommunityStatus;
