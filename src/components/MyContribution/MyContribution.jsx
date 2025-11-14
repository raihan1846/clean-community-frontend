import React from 'react';
import { Link } from 'react-router';

const MyContribution = () => {
    return (
        <div>
           <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sl No#</th>
                        <th>Issue Title</th>
                        <th>Category</th>
                        <th>Paid Amount</th>
                        <th>Date</th>
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
                            <Link className='btn bg-red-500'>Download Report</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        

        </div>
    );
};

export default MyContribution;