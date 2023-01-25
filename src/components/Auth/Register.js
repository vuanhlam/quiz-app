import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

import './Login.scss';
import { postRegister } from '~/services/apiServices';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [isShowPassword, setIsShowPassword] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const navigate = useNavigate();

    const handleRegister = async () => {
        // validate
        if (!validateEmail(email)) {
            toast.error('Invalid Email');
            return;
        }

        if (!password) {
            toast.error('Invalid password');
            return;
        }

        //submit apis
        let res = await postRegister(email, userName, password);
        console.log(res);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate('/login');
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                <span>Already have an account?</span>
                <button
                    className="signUp-btn"
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Log In
                </button>
            </div>
            <div className="wrap-login">
                <div className="title col-3 mx-auto">Quizlet</div>
                <div className="welcome col-3 mx-auto">Create An Account</div>
                <div className="contact-form col-3 mx-auto">
                    <div className="form-group">
                        <input
                            type={'email'}
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="password-wrapper">
                            <input
                                type={isShowPassword ? 'password' : 'text'}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isShowPassword ? (
                                <span
                                    onClick={() => setIsShowPassword(false)}
                                >
                                    <VscEye />
                                </span>
                            ) : (
                                <span
                                    onClick={() => setIsShowPassword(true)}
                                >
                                    <VscEyeClosed />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type={'text'}
                            className="form-control"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn-submit" onClick={() => handleRegister()}>
                            Sign Up
                        </button>
                    </div>
                    <div className="homePage">
                        <span
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            &#60;&#60; Go To HomePage
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
