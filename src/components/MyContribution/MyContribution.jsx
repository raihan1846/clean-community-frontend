import React, { useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const MyContribution = () => {
    const { user } = React.useContext(AuthContext);
    const [contributions, setContributions] = useState([]);
    const totalRef = useRef(null);
    // Fetch user contributions
    useEffect(() => {
        if (!user?.email) return;
        fetch('http://localhost:3000/all-contribution')
            .then(res => res.json())
            .then(data => {
                const myContribs = data.filter(c => c.email === user.email);
                setContributions(myContribs);
            })
            .catch(err => console.error(err));
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
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/all-contribution/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0 || data.success) {
                            Swal.fire('Deleted!', 'Your contribution has been deleted.', 'success');
                            setContributions(prev => prev.filter(c => c._id !== id));
                        }
                    })
                    .catch(err => console.error(err));
            }
        });
    }

    const totalAmount = contributions.reduce((sum, c) => sum + Number(c.amount || 0), 0);

    // Print all contributions
    const handlePrintTotal = () => {
        if (!totalRef.current) return;
        const printContents = totalRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    }

    // Print function for single row
    const handlePrintRow = (contrib) => {
        const content = `
        <h2>Contribution Detail</h2>
        <table border="1" style="width:100%; border-collapse: collapse;">
            <tr><th>Title</th><td>${contrib.title}</td></tr>
            <tr><th>Category</th><td>${contrib.category}</td></tr>
            <tr><th>Amount ($)</th><td>${contrib.amount}</td></tr>
            <tr><th>Date</th><td>${contrib.date}</td></tr>
        </table>
        `;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = content;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                My Contributions ({contributions.length}) - Total Collected: ${totalAmount}
            </h2>

            <div className="overflow-x-auto" ref={totalRef}>
                <table className="table w-full border">
                    <thead>
                        <tr>
                            <th>Sl No#</th>
                            <th>Issue Title</th>
                            <th>Category</th>
                            <th>Paid Amount ($)</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributions.map((c, idx) => (
                            <tr key={c._id}>
                                <th>{idx + 1}</th>
                                <td>{c.title}</td>
                                <td>{c.category}</td>
                                <td>${c.amount}</td>
                                <td>{c.date}</td>
                                <td>
                                    <button
                                        className='btn bg-red-500 text-white'
                                        onClick={() => handleDelete(c._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className='btn btn-primary btn-sm'
                                        onClick={() => handlePrintRow(c)}
                                    >
                                        Print
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {contributions.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center text-gray-500">No contributions yet.</td>
                            </tr>
                        )}
                        {contributions.length > 0 && (
                            <tr className="font-bold">
                                <td colSpan={3} className="text-right">Total Collected</td>
                                <td>${totalAmount}</td>
                                <td colSpan={2}></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Print all contributions */}
            {contributions.length > 0 && (
                <div className="mt-4">
                    <button className='btn btn-success' onClick={handlePrintTotal}>
                        Print All Contributions
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyContribution;
