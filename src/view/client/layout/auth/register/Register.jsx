import '../login/login.css'
import { Link } from "react-router-dom";
import AuthService from "../../../../../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { useState } from 'react';
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    const [formRegister, setFormRegister] = useState({ firtname:'',lastname:'', email:'',username: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = async () => {
        try {
            const newForm = {
                fullname: (formRegister.lastname + " " + formRegister.firtname), 
                email: formRegister.email,
                username: formRegister.username,
                password: formRegister.password,
            }
            const response = await AuthService.postRegister(newForm);
            // Kiểm tra trạng thái của phản hồi
            if (response.status === 200) { // Hoặc bất kỳ mã trạng thái thành công nào khác mà bạn mong đợi
                // Xử lý khi đăng ký thành công
                console.log('Đăng ký thành công');
                toast('Register successful!');
            } else {
                // Xử lý khi đăng ký không thành công
                console.log('Đăng ký không thành công');
                toast('Register failed. Please try again.'); // Set error message
            }
        } catch (error) {
            toast('Register failed. Please try again.'); // Set error message
            console.error('Đã xảy ra lỗi khi thực hiện đăng ký:', error);
        }
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        const passwordInput = document.querySelector('.input-password');
        passwordInput.type = passwordVisible ? 'password' : 'text';
    }
    // Hàm handleChange chung
    const handleChange = (fieldName) => (event) => {
        setFormRegister({ ...formRegister, [fieldName]: event.target.value });
    };

    return (
        <div className="login-page-container">
            <ToastContainer />
            <div className="card">
                <form>
                    <div className="logo-container">
                        <img src="/static/media/logoGoDana.e9590f267fe64f21b5e5.png" width="40%"></img>
                    </div>
                    <p className="text-title">Register</p>
                    <div style={{display:"flex",flexDirection:"row", gap:"10px"}}>
                        <div >
                            <label className="text-lable">First name</label>
                            <input
                                type="text"
                                className="input-username"
                                placeholder="Enter first name"
                                value={formRegister.firtname}
                                onChange={handleChange('firtname')}
                            />
                        </div>
                        <div>
                            <label className="text-lable">Last name</label>
                            <input
                                type="text"
                                className="input-username"
                                placeholder="Enter last name"
                                value={formRegister.lastname}
                                onChange={handleChange('lastname')}
                            />
                        </div>
                    </div>
                    <div className="field-container">
                        <label className="text-lable">Email</label>
                        <input
                            type="email"
                            className="input-username"
                            placeholder="Enter email"
                            value={formRegister.email}
                            onChange={handleChange('email')}
                        />
                    </div>
                    <div className="field-container">
                        <label className="text-lable">Username</label>
                        <input
                            type="text"
                            className="input-username"
                            placeholder="Enter username"
                            value={formRegister.username}
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
                                value={formRegister.password}
                                onChange={handleChange('password')}
                            />
                            <button type="button" className="status-password" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaRegEyeSlash />: <FaRegEye />}
                            </button>
                        </div>
                    </div>
                    <div className="field-container">
                        <button type="button" className="button-login" onClick={handleSubmit}>Đăng ký</button>
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