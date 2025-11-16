import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllIssues = () => {

    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        fetch('http://localhost:3000/all-issues')
        .then(res=>res.json())
        .then(data=>{
            setIssues(data);
            setFilteredIssues(data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    },[]);

    useEffect(() => {
        let temp = [...issues];
        if (categoryFilter) {
            temp = temp.filter(issue => issue.category === categoryFilter);
        }
        if (statusFilter) {
            temp = temp.filter(issue => issue.status === statusFilter);
        }
        setFilteredIssues(temp);
    }, [categoryFilter, statusFilter, issues]);

    return (
        <div  className="p-4">
          {/* Filters */}
          <div className="flex gap-4 mb-4">
          <select
              className="select select-bordered"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
          >
              <option value="">All Categories</option>
              <option value="Garbage">Garbage</option>
              <option value="Illegal Construction">Illegal Construction</option>
              <option value="Broken Public Property">Broken Public Property</option>
              <option value="Road Damage">Road Damage</option>
          </select>

          <select
              className="select select-bordered"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
          >
              <option value="">All Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
          </select>

          <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                  setCategoryFilter('');
                  setStatusFilter('');
              }}
          >
              Clear Filters
          </button>
      </div>
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
                    filteredIssues.map((issue,index)=>(
                        <tr key={issue._id}>
                        <th>{index + 1}</th>
                        <td><img className='h-20 w-20' src={issue.image} alt="" /></td>
                        <td>{issue.title}</td>
                        <td>{issue.category}</td>
                        <td>{issue.location}</td>
                        <td>${issue.amount}</td>
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
            )
        }
        </div>
    );
};

export default AllIssues;