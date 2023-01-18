import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { SiReactivex } from 'react-icons/si';
import { RiDashboard3Fill } from 'react-icons/ri';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { BsFillBarChartFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';

import sidebarBg from '~/assets/images/bg2.jpg';

const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <ProSidebar
            image={sidebarBg}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <SiReactivex size={'3em'} color={'00bfff'} />
                    <span className="title">Quizlet Dashboard</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<RiDashboard3Fill />} suffix={<span className="badge red">New</span>}>
                        {/* {intl.formatMessage({ id: 'dashboard' })} */}
                        Dashboard
                        <Link to="/admins"/>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        // suffix={<span className="badge yellow">3</span>}
                        // title={intl.formatMessage({ id: 'withSuffix' })}
                        icon={<MdOutlineFeaturedPlayList />}
                        title="Features"
                    >
                        <MenuItem >
                            User Management
                            <Link to="/admins/manage-users"/>
                        </MenuItem>
                        <MenuItem>
                            Quiz Management
                            <Link to="/admins/manage-quizes"/>
                        </MenuItem>
                        <MenuItem>
                            Question Management
                            <Link to="/admins/manage-questions"/>
                        </MenuItem>
                    </SubMenu>
                    {/* <SubMenu
                        prefix={<span className="badge gray">3</span>}
                        // title={intl.formatMessage({ id: 'withPrefix' })}
                        icon={<FaHeart />}
                    >
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                    </SubMenu> */}
                    {/* <SubMenu icon={<FaList />}>
                        <MenuItem>1 </MenuItem>
                        <MenuItem> 2 </MenuItem>
                        <SubMenu>
                            <MenuItem> 3.1 </MenuItem>
                            <MenuItem>3.2 </MenuItem>
                            <SubMenu title={`$3.3`}>
                                <MenuItem>3.3.1 </MenuItem>
                                <MenuItem>3.3.2 </MenuItem>
                                <MenuItem>3.3.3 </MenuItem>
                            </SubMenu>
                        </SubMenu>
                    </SubMenu> */}
                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <div className="sidebar-btn" rel="noopener noreferrer">
                        <BsFillBarChartFill />
                    </div>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SideBar;
