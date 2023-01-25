import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import SideBar from './SideBar';
import './Admin.scss';


function Admin() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="amdin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="amdin-header">
                    <FaBars className="control-btn-sidebar" onClick={() => setCollapsed(!collapsed)} />
                </div>
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
            
        </div>
    );
}

export default Admin;
