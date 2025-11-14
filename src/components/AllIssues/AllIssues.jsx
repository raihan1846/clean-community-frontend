import React from 'react';
import { Link } from 'react-router';

const AllIssues = () => {
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
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                        <td>Blue</td>
                        <td>Blue</td>
                        <td>
                            <Link to="see-details" className='btn btn-primary mr-3'>See Details</Link>
                            {/* <Link to="edit" className='btn btn-success mr-3'>Edit</Link>
                            <Link className='btn bg-red-500'>Delete</Link> */}
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default AllIssues;