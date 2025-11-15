import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const IssueDetails = () => {
    const {id} = useParams();
    const [issue,setIssue] = useState(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/all-issues/${id}`)
            .then(res => res.json())
            .then(data => setIssue(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!issue) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex justify-center">
            <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">

                {/* Title */}
                <h1 className="text-4xl font-bold mb-6">
                {issue.title}
                </h1>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                    <div>
                        <p className="text-gray-500">Category</p>
                        <p className="text-lg font-semibold">{issue.category}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Location</p>
                        <p className="text-lg font-semibold">{issue.location}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Date</p>
                        <p className="text-lg font-semibold">{issue.date}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Suggested Fix Budget</p>
                        <p className="text-lg font-semibold">${issue.amount}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-1">Description</h2>
                    <p className="text-gray-700 leading-relaxed">
                    {issue.description}
                    </p>
                </div>

                {/* Image */}
                <div className="mb-10">
                    <img
                        src={issue.image}
                        alt="Issue"
                        className="rounded-xl shadow-md"
                    />
                </div>

                {/* Progress & Contribution */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-lg">Total Collected</p>
                        <p className="text-xl font-bold text-green-700">₹7,500</p>
                    </div>

                    <div className="h-3 w-full bg-gray-300 rounded-full">
                        <div
                            className="bg-green-600 h-3 rounded-full"
                            style={{ width: "62%" }}
                        ></div>
                    </div>

                    {/* Open Modal Button */}
                    <button
                        className="btn btn-neutral mt-5 w-full rounded-xl"
                        onClick={() => setOpen(true)}
                    >
                        Pay Clean-Up Contribution
                    </button>
                </div>

                {/* Contributors Table */}
                <h2 className="text-2xl font-bold mb-4">Contributors</h2>

                <div className="overflow-x-auto border rounded-xl mb-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img
                                        src="https://via.placeholder.com/50"
                                        className="w-12 h-12 rounded-full"
                                        alt="User"
                                    />
                                </td>
                                <td className="font-semibold">Rahim Uddin</td>
                                <td className="font-bold">₹2,500</td>
                            </tr>

                            <tr>
                                <td>
                                    <img
                                        src="https://via.placeholder.com/50"
                                        className="w-12 h-12 rounded-full"
                                        alt="User"
                                    />
                                </td>
                                <td className="font-semibold">Sumaiya Akhter</td>
                                <td className="font-bold">₹5,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* MODAL */}
                {open && (
                    <dialog open className="modal">
                        <div className="modal-box max-w-lg">
                            <h3 className="text-2xl font-bold mb-4">
                                Clean-Up Contribution
                            </h3>

                            <form className="space-y-3">

                                <div>
                                    <label className="font-semibold">Issue Title</label>
                                    <input
                                        type="text"
                                        value="Broken Street Light at Main Road"
                                        readOnly
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Amount</label>
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Contributor Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Email</label>
                                    <input
                                        type="email"
                                        value="user@example.com"
                                        readOnly
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Address</label>
                                    <textarea
                                        placeholder="Enter address"
                                        className="textarea textarea-bordered w-full"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="font-semibold">Date</label>
                                    <input
                                        type="text"
                                        value="14 Nov 2025"
                                        readOnly
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="font-semibold">Additional Info</label>
                                    <textarea
                                        placeholder="Optional details"
                                        className="textarea textarea-bordered w-full"
                                    ></textarea>
                                </div>

                                <button className="btn btn-neutral w-full mt-3">
                                    Submit Contribution
                                </button>
                            </form>

                            {/* Close Button */}
                            <div className="modal-action">
                                <button className="btn" onClick={() => setOpen(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </dialog>
                )}
            </div>
        </div>
    );
};

export default IssueDetails;
