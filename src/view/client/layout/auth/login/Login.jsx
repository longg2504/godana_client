import React, { useState } from "react";
import '../login/login.css'
import { Link } from "react-router-dom";
import AuthService from "../../../../../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const [formLogin, setFormLogin] = useState({ username: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [touched, setTouched] = useState({ username: false, password: false });

    const handleSubmit = async () => {
        try {
            const response = await AuthService.postLogin(formLogin);
            if (response.status === 200) {
                console.log('Đăng nhập thành công');
                toast.success('Login successful!');
            } else {
                console.log('Đăng nhập không thành công');
                toast('Login failed. Please try again.');
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
            console.error('Đã xảy ra lỗi khi thực hiện đăng nhập:', error);
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleChange = (fieldName) => (event) => {
        setFormLogin({ ...formLogin, [fieldName]: event.target.value });
    };

    const handleBlur = (fieldName) => () => {
        setTouched({ ...touched, [fieldName]: true });
    };

    const handleFormSubmit = () => {
        if (!isInvalid()) {
            handleSubmit();
        } else {
            toast.error('Please fill in all required fields.');
        }
    }

    const isInvalid = () => {
        return !formLogin.username || !formLogin.password;
    };

    return (
        <div className="login-page-container">
            <ToastContainer />
            <div className="card">
                <form>
                    <div className="logo-container">
                        <img src="/static/media/logoGoDana.e9590f267fe64f21b5e5.png" width="40%" alt="logo"></img>
                    </div>
                    <p className="text-title">Login</p>
                    <div className="field-container">
                        <label className="text-lable">Username</label>
                        <span className="text-error">{touched.username && !formLogin.username && 'Username is required'}</span>
                        <input
                            type="text"
                            className="input-username"
                            placeholder="Enter username"
                            value={formLogin.username}
                            onChange={handleChange('username')}
                            onBlur={handleBlur('username')}
                        />
                    </div>
                    <div className="field-container">
                        <label className="text-lable">Password</label>
                        <span className="text-error">{touched.password && !formLogin.password && 'Password is required'}</span>
                        <div className="input-password-container">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="input-password"
                                placeholder="Enter password"
                                value={formLogin.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            <button type="button" className="status-password" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                    </div>
                    <div className="field-container">
                        <button type="button" className="button-login" onClick={handleFormSubmit}>Đăng nhập</button>
                    </div>
                </form>
                <div className="field-container">
                    <Link to="/register" className="link-extent">Do not have an account?</Link>
                    <Link to="#" className="link-extent">Forgot password?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
