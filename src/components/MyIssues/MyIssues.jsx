import React, { use, useEffect, useState } from 'react';
import { data, Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import useDocumentTitle from '../useDocumentTitle/useDocumentTitle';

const MyIssues = () => {
    useDocumentTitle("My Issue");

    const { user } = use(AuthContext);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        if (user?.email) {
            fetch(`https://clean-community.vercel.app/all-issues?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIssues(data);
                    setLoading(false);
                });
        }
    }, [user?.email]);
    
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://clean-community.vercel.app/all-issues/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0 || data.success) { // backend response check
                        Swal.fire(
                            'Deleted!',
                            'Your issue has been deleted.',
                            'success'
                        );
                        setIssues(prev => prev.filter(issue => issue._id !== id)); // UI update
                    }
                })
                .catch(err => console.error(err));
            }
        });
    }
    
    return (
        <div>
            {
            loading ? (
                <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            ):(
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            issues.map((issue, index) => (
                                <tr key={issue._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img src={issue.image} className="w-16 h-16 rounded" />
                                    </td>
                                    <td>{issue.title}</td>
                                    <td>{issue.category}</td>
                                    <td>{issue.location}</td>
                                    <td>${issue.amount}</td>
                                    <td>
                                        <Link
                                            to={`/see-details/${issue._id}`}
                                            className='btn btn-primary mr-3'
                                        >
                                            See Details
                                        </Link>

                                        <Link
                                            to={`/edit-issue/${issue._id}`}
                                            className='btn btn-success mr-3'
                                        >
                                            Edit
                                        </Link>

                                        <button onClick={() => handleDelete(issue._id)} className='btn bg-red-500'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            )
                    }
            <div className='flex justify-center item-center m-4'>
                <Link className="btn btn-active btn-primary" to="/add-issue">Add Issue</Link>
            </div>

        </div>
    );
};

export default MyIssues;