import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImSpinner10 } from 'react-icons/im'

import './Login.scss';
import { postLogin } from '~/services/apiServices';
import { useDispatch } from 'react-redux';
import { doLogin } from '~/redux/action/userActions';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleLogin = async() => {
        // validate
        if (!validateEmail(email)) {
            toast.error('Invalid Email');
            return;
        }

        if (!password) {
            toast.error('Invalid password');
            return;
        }

        setIsloading(true)
        //submit apis
        let res = await postLogin(email, password);
        console.log(res)

        if(res && res.EC === 0) {
            dispatch(doLogin(res))
            toast.success(res.EM);
            setIsloading(false);
            navigate('/');
        }

        if(res && res.EC !== 0) {
            setIsloading(false);
            toast.error(res.EM)
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                Don't have an account yet?
                <button 
                    className="signUp-btn"
                    onClick={() => {navigate('/register')}}
                >
                    Sign up
                </button>
            </div>
            <div className="wrap-login">
                <div className="title col-3 mx-auto">Quizlet</div>
                <div className="welcome col-3 mx-auto">Hello, who’s this?</div>
                <div className="contact-form col-3 mx-auto">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type={'email'}
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type={'password'}
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <span className="forgot-password">Forgot password ?</span>
                    <div>
                        <button 
                            className="btn-submit" 
                            onClick={() => handleLogin()} 
                            disabled={isLoading}
                        >
                            {isLoading && <ImSpinner10 className='loader-icon'/>}
                            Login to Quizlet
                        </button>
                    </div>
                    <div className="homePage">
                        <span
                            onClick={() => {
                                navigate('/');
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

export default Login;
