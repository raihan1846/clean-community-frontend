import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const UpdateContribution = () => {
    const { user } = useContext(AuthContext);
    const { id: issueId } = useParams(); 
    const navigate = useNavigate();

    const [issue, setIssue] = useState(null);
    const [contributions, setContributions] = useState([]);
    const [userContribution, setUserContribution] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetch(`https://clean-community.vercel.app/all-issues/${issueId}`)
            .then(res => res.json())
            .then(data => {
                if (!data || data.error) {
                    Swal.fire("Error", "Issue not found!", "error");
                    navigate("/");
                } else {
                    setIssue(data);
                }
            })
            .catch(() => {
                Swal.fire("Error", "Failed to load issue", "error");
                navigate("/");
            });
    }, [issueId, navigate]);

    useEffect(() => {
        if (!issue) return;
        fetch('https://clean-community.vercel.app/all-contribution')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(c => c.issueId === issue._id);
                setContributions(filtered);
            });
    }, [issue]);

    useEffect(() => {
        if (!user || !issue) return;

        fetch(`https://clean-community.vercel.app/my-contribution/${issueId}?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserContribution(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setUserContribution(null);
                setLoading(false);
            });
    }, [user, issue, issueId]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!userContribution) return;

        const updatedData = {
            amount: parseFloat(e.target.amount.value),
            contributorName: e.target.contributorName.value,
            phone: e.target.phoneNo.value || "",
            location: e.target.address.value || issue.location,
            description: e.target.additionalInfo.value || "",
            date: new Date().toISOString(),
        };

        try {
            const res = await fetch(`https://clean-community.vercel.app/all-contribution/${userContribution._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });

            const result = await res.json();

            if (result.modifiedCount > 0) {
                Swal.fire("Success!", "Contribution updated successfully", "success");
                setTimeout(() => navigate('/my-contribution'), 100);
            }
        } catch (err) {
            Swal.fire("Error", "Failed to update", "error");
        }
    };

    if (loading) return <div className="text-center p-20">Loading...</div>;
    if (!issue) return null;

    return (
        <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
                Update Your Contribution
            </h1>

            <div className="bg-blue-50 p-8 rounded-xl shadow mb-8">
                <h2 className="text-3xl font-bold text-blue-900">{issue.title}</h2>
                <p className="text-xl mt-2">Location: {issue.location}</p>
                <p className="text-lg mt-4">Total Contributors: {contributions.length}</p>
            </div>

            {!userContribution ? (
                <div className="text-center py-20 text-2xl text-red-600">
                    You haven't contributed to this issue yet.
                </div>
            ) : (
                <form onSubmit={handleUpdateSubmit} className="bg-white p-10 rounded-xl shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Edit Your Contribution</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="label font-bold">Paid Amount ($)</label>
                            <input type="number" name="amount" required defaultValue={userContribution.amount} className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label font-bold">Name</label>
                            <input type="text" name="contributorName" required defaultValue={userContribution.contributorName} className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label font-bold">Email</label>
                            <input type="email" value={user.email} readOnly className="input input-bordered w-full bg-gray-100" />
                        </div>
                        <div>
                            <label className="label font-bold">Phone</label>
                            <input type="tel" name="phoneNo" defaultValue={userContribution.phone || ""} className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="label font-bold">Address</label>
                        <textarea name="address" rows="3" defaultValue={userContribution.location || issue.location} className="textarea textarea-bordered w-full"></textarea>
                    </div>

                    <div className="mt-6">
                        <label className="label font-bold">Message</label>
                        <textarea name="additionalInfo" rows="4" defaultValue={userContribution.description || ""} className="textarea textarea-bordered w-full"></textarea>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg w-full mt-10">
                        Update Contribution
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateContribution;