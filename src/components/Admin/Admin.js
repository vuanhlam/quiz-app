import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

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
        <FaBars className='control-btn-sidebar' onClick={() => setCollapsed(!collapsed)}/>
        <h1>Admin content</h1>
      </div>
    </div>
  );
}

export default Admin;
