import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import useDocumentTitle from '../useDocumentTitle/useDocumentTitle';
import { Link } from 'react-router'; 

const MyContribution = () => {
    useDocumentTitle("My Contributions");
    const { user } = useContext(AuthContext);
    const [contributions, setContributions] = useState([]);
    const [issuesMap, setIssuesMap] = useState({}); 
    const totalRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);

                const contribRes = await fetch('https://clean-community.vercel.app/all-contribution');
                const allContributions = await contribRes.json();

                const myContribs = allContributions.filter(c => c.email === user.email);

                const issueIds = [...new Set(myContribs.map(c => c.issueId))];

                const issuesPromises = issueIds.map(id =>
                    fetch(`https://clean-community.vercel.app/all-issues/${id}`).then(res => res.json())
                );
                const issuesData = await Promise.all(issuesPromises);

                const map = {};
                issuesData.forEach(issue => {
                    if (issue?._id) map[issue._id] = issue;
                });
                setIssuesMap(map);
                setContributions(myContribs);
            } catch (err) {
                console.error("Failed to load contributions", err);
                Swal.fire("Error", "Failed to load your contributions", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`https://clean-community.vercel.app/all-contribution/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Contribution removed.', 'success');
                        setContributions(prev => prev.filter(c => c._id !== id));
                    }
                })
                .catch(() => Swal.fire('Error', 'Failed to delete', 'error'));
            }
        });
    };

    const totalAmount = contributions.reduce((sum, c) => sum + Number(c.amount || 0), 0);

    const handlePrintTotal = () => {
        if (!totalRef.current) return;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(totalRef.current.innerHTML);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const handlePrintRow = (contrib, issue) => {
        const printWindow = window.open('', '', 'height=500,width=700');
        printWindow.document.write(`
            <html><head><title>Contribution Receipt</title></head><body>
                <h2>Clean Community Contribution Receipt</h2>
                <p><strong>Name:</strong> ${contrib.contributorName || 'Anonymous'}</p>
                <p><strong>Email:</strong> ${contrib.email}</p>
                <p><strong>Issue:</strong> ${issue?.title || 'Unknown'}</p>
                <p><strong>Category:</strong> ${issue?.category || 'N/A'}</p>
                <p><strong>Location:</strong> ${issue?.location || 'N/A'}</p>
                <p><strong>Amount Paid:</strong> $${contrib.amount}</p>
                <p><strong>Date:</strong> ${new Date(contrib.date).toLocaleDateString()}</p>
                <hr>
                <p>Thank you for your contribution!</p>
            </body></html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    if (!user) {
        return <div className="text-center py-20 text-2xl">Please log in to view your contributions.</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-green-700">
                My Contributions ({contributions.length}) 
                <span className="block text-2xl mt-2">Total Donated: <strong className="text-green-600">${totalAmount}</strong></span>
            </h2>

            {loading ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : contributions.length === 0 ? (
                <div className="text-center py-20 text-xl text-gray-600">
                    You haven't made any contributions yet. 
                    <Link to="/" className="btn btn-success ml-4">Start Contributing</Link>
                </div>
            ) : (
                <div ref={totalRef} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Issue Title</th>
                                    <th>Category</th>
                                    <th>Location</th>
                                    <th>Paid Amount ($)</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contributions.map((c, index) => {
                                    const issue = issuesMap[c.issueId];
                                    return (
                                        <tr key={c._id} className="hover:bg-gray-50">
                                            <th>{index + 1}</th>
                                            <td className="font-semibold">{issue?.title || 'Loading...'}</td>
                                            <td>{issue?.category || 'N/A'}</td>
                                            <td>{issue?.location || 'N/A'}</td>
                                            <td className="font-bold text-green-600">${c.amount}</td>
                                            <td>{new Date(c.date).toLocaleDateString()}</td>
                                            <td className="space-x-2">
                                                {issue && (
                                                    <Link
                                                        to={`/update-contribution/${c.issueId}`}
                                                        className="btn btn-success btn-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(c._id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    Delete
                                                </button>
                                                {issue && (
                                                    <button
                                                        onClick={() => handlePrintRow(c, issue)}
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        Print
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr className="bg-green-100 font-bold text-lg">
                                    <td colSpan="4" className="text-right">Total Collected</td>
                                    <td>${totalAmount}</td>
                                    <td colSpan="2"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 text-center">
                        <button onClick={handlePrintTotal} className="btn btn-success btn-lg">
                            Print All Contributions
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyContribution;