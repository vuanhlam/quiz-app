import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '~/services/apiServices';
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async() => {
        // validate


        //submit apis
        let res = await postLogin(email, password);
        console.log(res)

        if(res && res.EC === 0) {
            toast.success(res.EM);
            navigate('/')
        }

        if(res && res.EC !== 0) {
            toast.error(res.EM)
        }
    };

    return (
        <div className="login-container">
            <div className="header">
                Don't have an account yet?
                <button className="signUp-btn">Sign up</button>
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
                        <button className="btn-submit" onClick={() => handleLogin()}>
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
