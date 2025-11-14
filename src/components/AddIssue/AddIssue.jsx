import React from 'react';

const AddIssue = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
        <div className="backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl rounded-2xl w-full max-w-3xl p-10">

            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Report an Issue
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Issue Title */}
                <div className="form-control col-span-1">
                    <label className="label font-semibold">Issue Title</label>
                    <input
                        type="text"
                        name='title'
                        className="input input-bordered rounded-xl"
                        placeholder="Enter issue title"
                    />
                </div>

                {/* Category */}
                <div className="form-control col-span-1">
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
                    <label className="label font-semibold">Upload Image</label>
                    <input
                        type="file"
                        name='imagePath'
                        className="file-input file-input-bordered rounded-xl w-full"
                    />
                </div>

                {/* Suggested Budget */}
                <div className="form-control col-span-1">
                    <label className="label font-semibold">Suggested Fix Budget (Amount)</label>
                    <input
                        type="number"
                        name='amount'
                        className="input input-bordered rounded-xl"
                        placeholder="Estimated cost"
                    />
                </div>

                {/* Status */}
                <div className="form-control col-span-1">
                    <label className="label font-semibold">Status</label>
                    <input
                        type="text"
                        name='status'
                        value="Ongoing"
                        readOnly
                        className="input input-bordered bg-gray-100 rounded-xl"
                    />
                </div>

                {/* Date */}
                <div className="form-control col-span-1">
                    <label className="label font-semibold">Date</label>
                    <input
                        type="text"
                        name='date'
                        value={new Date().toLocaleDateString()}
                        readOnly
                        className="input input-bordered bg-gray-100 rounded-xl"
                    />
                </div>

                {/* User Email */}
                <div className="form-control col-span-1">
                    <label className="label font-semibold">Your Email</label>
                    <input
                        type="email"
                        name='email'
                        // value={userEmail}
                        readOnly
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