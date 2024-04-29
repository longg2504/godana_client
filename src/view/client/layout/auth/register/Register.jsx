import '../login/login.css';
import { Link } from "react-router-dom";
import AuthService from "../../../../../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    const [formRegister, setFormRegister] = useState({ firstname: '', lastname: '', email: '', username: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [touched, setTouched] = useState({ firstname: false, lastname: false, email: false, username: false, password: false });

    const handleSubmit = async () => {
        try {
            const newForm = {
                fullname: (formRegister.lastname + " " + formRegister.firstname),
                email: formRegister.email,
                username: formRegister.username,
                password: formRegister.password,
            }
            const response = await AuthService.postRegister(newForm);
            if (response.status === 200) {
                console.log('Đăng ký thành công');
                toast.success('Register successful!');
            } else {
                console.log('Đăng ký không thành công');
                toast.error('Register failed. Please try again.');
            }
        } catch (error) {
            toast.error('Register failed. Please try again.');
            console.error('Đã xảy ra lỗi khi thực hiện đăng ký:', error);
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleChange = (fieldName) => (event) => {
        setFormRegister({ ...formRegister, [fieldName]: event.target.value });
    };

    const handleBlur = (fieldName) => () => {
        setTouched({ ...touched, [fieldName]: true });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!isInvalid()) {
            handleSubmit();
        } else {
            toast.error('Please fill in all required fields.');
        }
    }

    const isInvalid = () => {
        return (
            formRegister.firstname.trim().length < 1 ||
            formRegister.lastname.trim().length < 1 ||
            !emailRegex.test(formRegister.email.trim()) ||
            formRegister.username.trim().length < 6 ||
            formRegister.password.trim().length < 8
        );
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return (
        <div className="login-page-container">
            <ToastContainer />
            <div className="card">
                <form onSubmit={handleFormSubmit}>
                    <div className="logo-container">
                        <img src="/static/media/logoGoDana.e9590f267fe64f21b5e5.png" width="40%" alt="logo"></img>
                    </div>
                    <p className="text-title">Register</p>
                    <div className="field-container">
                        <table>
                            <tr>
                                <td><label className="text-lable">First name</label></td>
                                <td><label className="text-lable">Last name</label></td>
                            </tr>
                            <tr>
                                <td>{touched.firstname && formRegister.firstname.trim().length < 1 && <span className="text-error">First name is required</span>}</td>
                                <td>{touched.lastname && formRegister.lastname.trim().length < 1 && <span className="text-error">Last name is required</span>}</td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="input-username"
                                        placeholder="Enter first name"
                                        value={formRegister.firstname}
                                        onChange={handleChange('firstname')}
                                        onBlur={handleBlur('firstname')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input-username"
                                        placeholder="Enter last name"
                                        value={formRegister.lastname}
                                        onChange={handleChange('lastname')}
                                        onBlur={handleBlur('lastname')}
                                    />
                                </td>
                            </tr>
                        </table>

                    </div>
                    <div className="field-container">
                        <label className="text-lable">Email</label>
                        {touched.email && !emailRegex.test(formRegister.email.trim()) && <span className="text-error">Invalid email format</span>}
                        <input
                            type="email"
                            className="input-username"
                            placeholder="Enter email"
                            value={formRegister.email}
                            onChange={handleChange('email')}
                            onBlur={handleBlur('email')}
                        />
                    </div>
                    <div className="field-container">
                        <label className="text-lable">Username</label>
                        {touched.username && formRegister.username.trim().length < 6 && <span className="text-error">Username must be at least 6 characters long</span>}
                        <input
                            type="text"
                            className="input-username"
                            placeholder="Enter username"
                            value={formRegister.username}
                            onChange={handleChange('username')}
                            onBlur={handleBlur('username')}
                        />
                    </div>
                    <div className="field-container">
                        <label className="text-lable">Password</label>
                        {touched.password && formRegister.password.trim().length < 8 && <span className="text-error">Password must be at least 8 characters long</span>}
                        <div className="input-password-container">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className="input-password"
                                placeholder="Enter password"
                                value={formRegister.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            <button type="button" className="status-password" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                    </div>
                    <div className="field-container">
                        <button type="button" className="button-login">Đăng ký</button>
                    </div>
                </form>
                <div className="field-container">
                    <Link to="/login" className="link-extent">I already have an account</Link>
                </div>
            </div>
        </div>
    )
}
export default Register;
