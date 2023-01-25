import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from '~/App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/AdminContent/Dashboard';
import ManageUser from './components/Admin/AdminContent/ManageUser';
import ManageQuiz from './components/Admin/AdminContent/ManageQuiz';
import ManageQuestion from './components/Admin/AdminContent/ManageQuestion';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function Layout() {
    return (
        <>
            <Routers>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="/users" element={<User />} />
                    </Route>

                    <Route path="/admins" element={<Admin />}>
                        <Route index element={<Dashboard />} />
                        <Route path="manage-users" element={<ManageUser />} />
                        <Route path="manage-quizes" element={<ManageQuiz />} />
                        <Route path="manage-questions" element={<ManageQuestion />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Routers>
        </>
    );
}

export default Layout;
