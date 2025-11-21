import React, { use, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import useDocumentTitle from '../useDocumentTitle/useDocumentTitle';

const AddIssue = () => {
    useDocumentTitle("Add Issue");

    const { user } = use(AuthContext);

    const handleSubmitIssue = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const description = e.target.description.value;
        const image = e.target.photoURL.value;
        const amount = e.target.amount.value;
        const status = e.target.status.value;
        const date = new Date().toLocaleDateString();
        const email = user?.email;

        const newIssue = {
            title,
            category,
            location,
            description,
            image,
            amount,
            status,
            date,
            email,
        };
        fetch('https://clean-community.vercel.app/all-issues', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newIssue)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: "Successfully Added",
                    icon: "success",
                    draggable: true
                  }).then(()=>{
                    window.location.reload();
                  });
            })
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
            <div className="backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl rounded-2xl w-full max-w-3xl p-10">

                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Report an Issue
                </h2>

                <form onSubmit={handleSubmitIssue} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Issue Title */}
                    <div className="form-control col-span-2 md:col-span-1 lg:col-span-2">
                        <label className="label font-semibold">Issue Title</label>
                        <input
                            type="text"
                            name='title'
                            className="input input-bordered rounded-xl"
                            placeholder="Enter issue title"
                        />
                    </div>
                    {/* Email */}
                    <div className="form-control col-span-2 md:col-span-1 lg:col-span-2">
                        <label className="label font-semibold">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input input-bordered rounded-xl"
                            placeholder="Email"
                            value={user?.email}
                            readOnly
                        />
                    </div>

                    {/* Category */}
                    <div className="form-control col-span-2 md:col-span-1 lg:col-span-2">
                        <label className="label font-semibold">Category</label>
                        <select className="select select-bordered rounded-xl" name='category'>
                            <option disabled selected>Select a category</option>
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
                            placeholder="Enter location"
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control col-span-2">
                        <label className="label font-semibold">Description</label>
                        <textarea
                            name='description'
                            className="textarea textarea-bordered rounded-xl h-28"
                            placeholder="Describe the issue in detail..."
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="form-control col-span-2">
                        <label className="label font-semibold">Image</label>

                        <input
                            type="text"
                            name='photoURL'
                            className="input input-bordered rounded-xl"
                            placeholder="Enter PhotoURL"
                        />
                    </div>

                    {/* Suggested Budget */}
                    <div className="form-control col-span-2 md:col-span-1 lg:col-span-2">
                        <label className="label font-semibold">Suggested Fix Budget (Amount)</label>
                        <input
                            type="number"
                            name='amount'
                            className="input input-bordered rounded-xl"
                            placeholder="Estimated cost"
                        />
                    </div>

                    {/* Status */}
                    {/* <div className="form-control col-span-1">
                        <label className="label font-semibold">Status</label>
                        <input
                            type="text"
                            name='status'
                            value="Ongoing"
                            className="input input-bordered bg-gray-100 rounded-xl"
                        />
                    </div> */}
                    {/* Status */}
                    <div className="form-control col-span-2 md:col-span-1 lg:col-span-2">
                        <label className="label font-semibold">Status</label>
                        <select className="select select-bordered rounded-xl" name='status'>
                            <option disabled>Select a category</option>
                            <option selected>Ongoing</option>
                            <option>In Progress</option>
                            <option>Pending</option>
                            <option>Resolved</option>
                            <option>Rejected</option>
                        </select>
                    </div>


                    {/* Date */}
                    <div className="form-control col-span-2 md:col-span-1 lg:col-span-2">
                        <label className="label font-semibold">Date</label>
                        <input
                            type="text"
                            name='date'
                            value={new Date().toLocaleDateString()}
                            className="input input-bordered bg-gray-100 rounded-xl"
                        />
                    </div>


                    {/* Submit */}
                    <div className="col-span-2">
                        <button className="btn btn-neutral w-full rounded-xl text-lg py-3">
                            Submit Issue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddIssue;