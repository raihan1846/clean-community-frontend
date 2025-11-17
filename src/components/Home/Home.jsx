import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import ReportIssue from '../ReportIssue/ReportIssue';
import RecentComplain from '../RecentComplain/RecentComplain';
import CommunityStatus from '../CommunityStatus/CommunityStatus';
import Volunteer from '../Volunteer/Volunteer';
import useDocumentTitle from '../useDocumentTitle/useDocumentTitle';

const Home = () => {
    useDocumentTitle("Home");

    const [latestIssues, setLatestIssues] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [statusCounts, setStatusCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);
    
                let issuesData = [];
                let userData = { count: 0 };
                let statusData = {};
    
                try {
                    const res = await fetch('https://clean-community.vercel.app/latest-issues');
                    if (res.ok) issuesData = await res.json();
                } catch (e) { console.warn('Latest issues failed') }
    
                try {
                    const res = await fetch('https://clean-community.vercel.app/user-count');
                    if (res.ok) userData = await res.json();
                } catch (e) { console.warn('User count failed') }
    
                try {
                    const res = await fetch('https://clean-community.vercel.app/issues-status-count');
                    if (res.ok) statusData = await res.json();
                } catch (e) { console.warn('Status count failed') }
    
                setLatestIssues(issuesData);
                setUserCount(userData.count || 0);
                setStatusCounts(statusData);
    
            } catch (err) {
                setError('Network issue. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();
    }, []);
    return (
        <div>
            <Banner />
            <ReportIssue />
            {loading && (
                <div className="text-center py-20">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-xl">Loading...</p>
                </div>
            )}
            {error && (
                <div className="text-center py-10">
                    <p className="text-red-500 text-xl">{error}</p>
                    <button className="btn btn-primary mt-4" onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            )}
            {!loading && !error && (
                <>
                    <RecentComplain latestIssues={latestIssues} />
                    <CommunityStatus userCount={userCount} statusCounts={statusCounts} />
                </>
            )}

            <Volunteer />
        </div>
    );
};

export default Home;