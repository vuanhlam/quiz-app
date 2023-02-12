import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavDropdown } from 'react-bootstrap';


import SideBar from './SideBar';
import './Admin.scss';
import Language from '../Header/Language';

function Admin() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="amdin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="amdin-header">
                    <span>
                        <FaBars className="control-btn-sidebar icon" onClick={() => setCollapsed(!collapsed)} />
                    </span>
                    <div className='options'>
                        <Language/>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;
