import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { DarkModeProvider } from '../../context/DarkModContext/DarkModeContext';

const Root = () => {
    return (
        <DarkModeProvider>

        <div className='w-12/13 mx-auto min-h-screen'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>

        </DarkModeProvider>

    );
};

export default Root;