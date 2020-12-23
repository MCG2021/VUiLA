import React from 'react';
import '../../../App.css';


import Footer from '../../Footer';
import Dashboard from '../Dashboard/Dashboard';

export default function DashboardPage() {
    return (
        <>
         {/*<h1 className='dashboard'>DASHBOARD</h1>*/}
        <Dashboard/>
        <Footer />
        
        </>
    );  
}
