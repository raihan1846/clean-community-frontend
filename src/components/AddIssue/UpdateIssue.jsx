import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const UpdateIssue = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [issue, setIssue] = useState(null);

    // fetch issue by id
    useEffect(() => {
        fetch(`http://localhost:3000/all-issues/${id}`)
            .then(res => res.json())
            .then(data => {
                setIssue(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedIssue = {
            title: e.target.title.value,
            category: e.target.category.value,
            location: e.target.location.value,
            description: e.target.description.value,
            image: e.target.image.value,
            amount: e.target.amount.value,
            status: e.target.status.value,
            date: e.target.date.value,
            email: user?.email
        };

        fetch(`http://localhost:3000/all-issues/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedIssue)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire('Updated!', 'Issue updated successfully.', 'success');
                navigate('/my-issues');
            })
            .catch(err => console.error(err));
    };

    if (!issue) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
            <div className="backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl rounded-2xl w-full max-w-3xl p-10">

                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Update Issue
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Issue Title */}
                    <div className="form-control col-span-1">
                        <label className="label font-semibold">Issue Title</label>
                        <input
                            type="text"
                            name='title'
                            className="input input-bordered rounded-xl"
                            defaultValue={issue.title}
                        />
                    </div>

                    {/* Email */}
                    <div className="form-control col-span-1">
                        <label className="label font-semibold">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input input-bordered rounded-xl"
                            value={user?.email}
                            readOnly
                        />
                    </div>

                    {/* Category */}
                    <div className="form-control col-span-1">
                        <label className="label font-semibold">Category</label>
                        <select
                            className="select select-bordered rounded-xl"
                            name='category'
                            defaultValue={issue.category}
                        >
                            <option>Garbage</option>
                            <option>Illegal Construction</option>
                            <option>Broken Public Property</option>
                            <option>Road Damage</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="form-control col-span-2">
                        <label className="label font-semibold">Location</label>
                        <input
                            type="text"
                            name='location'
                            className="input input-bordered rounded-xl"
                            defaultValue={issue.location}
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control col-span-2">
                        <label className="label font-semibold">Description</label>
                        <textarea
                            name='description'
                            className="textarea textarea-bordered rounded-xl h-28"
                            defaultValue={issue.description}
                        />
                    </div>

                    {/* Image */}
                    <div className="form-control col-span-2">
                        <label className="label font-semibold">Image</label>
                        <input
                            type="text"
                            name='image'
                            className="input input-bordered rounded-xl"
                            defaultValue={issue.image}
                        />
                    </div>

                    {/* Suggested Budget */}
                    <div className="form-control col-span-1">
                        <label className="label font-semibold">Suggested Fix Budget (Amount)</label>
                        <input
                            type="number"
                            name='amount'
                            className="input input-bordered rounded-xl"
                            defaultValue={issue.amount}
                        />
                    </div>

                    {/* Status */}
                    {/* <div className="form-control col-span-1">
                        <label className="label font-semibold">Status</label>
                        <input
                            type="text"
                            name='status'
                            className="input input-bordered rounded-xl"
                            defaultValue={issue.status}
                        />
                    </div> */}

                    {/* Status */}
                    <div className="form-control col-span-1">
                        <label className="label font-semibold">Status</label>
                        <select className="select select-bordered rounded-xl" name='status' defaultValue={issue.status}>
                            <option disabled>Select a category</option>
                            <option>Ongoing</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="form-control col-span-1">
                        <label className="label font-semibold">Date</label>
                        <input
                            type="text"
                            name='date'
                            className="input input-bordered bg-gray-100 rounded-xl"
                            value={issue.date}
                            readOnly
                        />
                    </div>

                    {/* Submit */}
                    <div className="col-span-2">
                        <button className="btn btn-neutral w-full rounded-xl text-lg py-3">
                            Update Issue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateIssue;
