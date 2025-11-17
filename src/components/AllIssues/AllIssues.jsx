import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useDocumentTitle from '../useDocumentTitle/useDocumentTitle';
import { AiFillBank } from 'react-icons/ai';
import { BsAlarmFill } from 'react-icons/bs';

const AllIssues = () => {
    useDocumentTitle("All Issue List");

    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/all-issues')
            .then(res => res.json())
            .then(data => {
                setIssues(data);
                setFilteredIssues(data);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        let temp = [...issues];
        if (categoryFilter) {
            temp = temp.filter(issue => issue.category === categoryFilter);
        }
        if (statusFilter) {
            temp = temp.filter(issue => issue.status === statusFilter);
        }
        setTimeout(() => {
            setFilteredIssues(temp);
            setLoading(false);
        }, 300);
    }, [categoryFilter, statusFilter, issues]);
    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Filters */}
            <div className="bg-white shadow-md p-4 rounded-xl mb-6 flex flex-wrap gap-4 items-center">
                <select
                    className="select select-bordered w-52"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Illegal Construction">Illegal Construction</option>
                    <option value="Broken Public Property">Broken Public Property</option>
                    <option value="Road Damage">Road Damage</option>
                </select>

                <select
                    className="select select-bordered w-52"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                        setCategoryFilter('');
                        setStatusFilter('');
                    }}
                >
                    Clear Filters
                </button>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    {/* Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredIssues.map((issue) => (
                            <div
                                key={issue._id}
                                className="card bg-base-100 shadow-lg rounded-xl hover:shadow-xl transition border border-gray-100"
                            >
                                <figure className="h-56 overflow-hidden rounded-t-xl">
                                    <img
                                        src={issue.image}
                                        alt="Issue"
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </figure>

                                <div className="card-body">
                                    <h2 className="card-title text-lg font-semibold">
                                        {issue.title}
                                        <div
                                            className={`badge ${issue.status === "Resolved"
                                                ? "badge-success"
                                                : issue.status === "Rejected"
                                                    ? "badge-error"
                                                    : "badge-warning"
                                                } text-white`}
                                        >
                                            {issue.status}
                                        </div>
                                    </h2>
                                    <div className="badge badge-outline">${issue.amount}</div>

                                    <div className="card-actions flex flex-wrap justify-between gap-2 mt-2">
                                        {/* <div className="badge badge-outline">{issue.category}</div> */}
                                        <div className='flex gap-2 items-center'>
                                            <AiFillBank />
                                            <span>{issue.category}</span>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <BsAlarmFill />
                                            <span>{issue.location}</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/see-details/${issue._id}`}
                                        className="btn btn-primary btn-sm w-full mt-3"
                                    >
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        ))}

                    </div>
                </>
            )}
        </div>
    );

};

export default AllIssues;