import React, { use, useEffect, useState } from 'react';
import { data, Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const MyIssues = () => {
    const {user} = use(AuthContext);
    const [issues, setIssues] = useState([]);

   
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/all-issues?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIssues(data);
                });
        }
    }, [user?.email]);
   

    return (
        <div>
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
                                    <td>{issue.amount}</td>
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

                                        <button className='btn bg-red-500'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                </tbody>
            </table>
        </div>
        <div className='flex justify-center item-center m-4'>
            <Link className="btn btn-active btn-primary" to="/add-issue">Add Issue</Link>
            </div>

        </div>
    );
};

export default MyIssues;