import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllIssues = () => {

    const [issues, setIssues] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/all-issues')
        .then(res=>res.json())
        .then(data=>{
            setIssues(data);
        })
    },[])
    return (
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
                    issues.map((issue,index)=>(
                        <tr key={issue._id}>
                        <th>{index + 1}</th>
                        <td>{issue.image}</td>
                        <td>{issue.title}</td>
                        <td>{issue.category}</td>
                        <td>{issue.location}</td>
                        <td>{issue.amount}</td>
                        <td>
                            <Link to={`/see-details/${issue._id}`} className='btn btn-primary mr-3'>See Details</Link>
                            {/* <Link to="edit" className='btn btn-success mr-3'>Edit</Link>
                            <Link className='btn bg-red-500'>Delete</Link> */}
                        </td>
                    </tr>
                    ))
                   }

                </tbody>
            </table>
        </div>
    );
};

export default AllIssues;