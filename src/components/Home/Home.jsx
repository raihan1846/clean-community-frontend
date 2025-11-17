import React from 'react';
import Banner from '../Banner/Banner';
import ReportIssue from '../ReportIssue/ReportIssue';
import RecentComplain from '../RecentComplain/RecentComplain';
import CommunityStatus from '../CommunityStatus/CommunityStatus';
import Volunteer from '../Volunteer/Volunteer';
import useDocumentTitle from '../useDocumentTitle/useDocumentTitle';

const Home = () => {
    useDocumentTitle("Home");
    return (
        <div>
            <Banner></Banner>
            <ReportIssue></ReportIssue>
            <RecentComplain></RecentComplain>
            <CommunityStatus></CommunityStatus>
            <Volunteer></Volunteer>
        </div>
    );
};

export default Home;