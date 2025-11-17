import React, { useEffect, useState } from 'react';
import { BsAlarmFill } from "react-icons/bs";
import { AiFillBank } from "react-icons/ai";
import { Link } from 'react-router';

const RecentComplain = () => {
    const [latestIssues, setLatestIssues] = useState([]);
    useEffect(() => {
        fetch('https://clean-community.vercel.app/latest-issues')  
            .then(res => res.json())
            .then(data => setLatestIssues(data)
        )
            .catch(err => console.error(err));
    }, []);
    return (
        <div>
            <div className='m-7'>
                <h2 className='text-5xl font-bold text-center'>Recent Complain</h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
                
                {latestIssues.map(issue => (
                    <div key={issue._id} className="card w-full bg-base-100 shadow-sm">
                        <div className="card-body">

                            {/* Status & Date Row */}
                            <div className='flex justify-between'>
                                <span className="badge badge-xs badge-warning">
                                    {issue.status || "Pending"}
                                </span>
                                <span className="badge badge-xs">
                                    {issue.created_at?.slice(0, 10)}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold mt-2">{issue.title}</h2>

                            {/* Description */}
                            <p className="text-sm mt-2">
                                {issue.description?.slice(0, 100)}...
                            </p>

                            {/* Category & Location */}
                            <div className='flex justify-between mt-4'>
                                <div className='flex gap-2 items-center'>
                                    <AiFillBank />
                                    <span>{issue.category}</span>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <BsAlarmFill />
                                    <span>{issue.location}</span>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <div className="mt-6">
                                <Link
                                    className="btn btn-primary btn-block"
                                    to={`/see-details/${issue._id}`}
                                >
                                    View Details
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>

    );
};

export default RecentComplain;