import React, { useState } from "react";
import './login.css'
import { Link } from "react-router-dom";
import AuthService from "../../../../../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
    const [formLogin, setFormLogin] = useState({ username: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async () => {
        try {

            const response = await AuthService.postLogin(formLogin);
            // Kiểm tra trạng thái của phản hồi
            if (response.status === 200) { // Hoặc bất kỳ mã trạng thái thành công nào khác mà bạn mong đợi
                // Xử lý khi đăng nhập thành công
                console.log('Đăng nhập thành công');
                toast('Login successful!');
            } else {
                // Xử lý khi đăng nhập không thành công
                console.log('Đăng nhập không thành công');
                toast('Login failed. Please try again.'); // Set error message
            }
        } catch (error) {
            toast('Login failed. Please try again.'); // Set error message
            console.error('Đã xảy ra lỗi khi thực hiện đăng nhập:', error);
        }
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        const passwordInput = document.querySelector('.input-password');
        passwordInput.type = passwordVisible ? 'password' : 'text';
    }
    // Hàm handleChange chung
    const handleChange = (fieldName) => (event) => {
        // Cập nhật giá trị của formLogin[fieldName] khi người dùng thay đổi input
        setFormLogin({ ...formLogin, [fieldName]: event.target.value });
    };

    return (
        <div className="login-page-container">
            <ToastContainer />
            <div className="card">
                <form>
                    <div className="logo-container">
                        <img src="/static/media/logoGoDana.e9590f267fe64f21b5e5.png" width="40%"></img>
                    </div>
                    <p className="text-title">Login</p>
                    <div className="field-container">
                        <label className="text-lable">Username</label>
                        <input
                            type="text"
                            className="input-username"
                            placeholder="Enter username"
                            value={formLogin.username}
                            onChange={handleChange('username')}
                        />
                    </div>
                    <div className="field-container">
                        <label className="text-lable">Password</label>
                        <div className="input-password-container">
                            <input
                                type="password"
                                className="input-password"
                                placeholder="Enter password"
                                value={formLogin.password}
                                onChange={handleChange('password')}
                            />
                            <button type="button" className="status-password" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaRegEyeSlash />: <FaRegEye />}
                            </button>
                        </div>
                    </div>
                    <div className="field-container">
                        <button type="button" className="button-login" onClick={handleSubmit}>Đăng nhập</button>
                    </div>
                </form>
                <div className="field-container">
                    <Link to="/register" className="link-extent">Do not have an account?</Link>
                    <Link to="#" className="link-extent">Forgot passowrd?</Link>
                </div>
            </div>
        </div>
    )
}
export default Login;