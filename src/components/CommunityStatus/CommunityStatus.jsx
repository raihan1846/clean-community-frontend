import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const CommunityStatus = () => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/user-count")
            .then(res => res.json())
            .then(data => setUserCount(data.count));
    }, []);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center bg-blue-500 p-12 mt-20">
            <div>
                <h2 className="text-2xl font-bold">{userCount}</h2>
                <p>Registered Users</p>
            </div>
            <div>
                <h2 className="text-2xl font-bold">12,483</h2>
                <p>Issues Resolved</p>
            </div>
            <div>
                <h2 className="text-2xl font-bold">12,483</h2>
                <p>Pending Issues</p>
            </div>
        </div>
    );
};

export default CommunityStatus;
