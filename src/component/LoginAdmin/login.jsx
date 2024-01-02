import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import bg from '../../assets/donation-login.png'
const LoginAdmin = ({ onLogin }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();

        // Add your form submission logic here
        console.log('Username:', username);
        console.log('Password:', password);
        if (username === 'admin123@admin.com' && password === 'admin123') {
            toast.success('Login successful!', {

                style: {
                    background: 'green',
                    color: 'white',
                },
            });
            onLogin();
            navigate('./home')
        }
        else {
            toast.error('Wrong Credentials! Only Admin can log in to the dashboard!', {

                style: {
                    background: 'red',
                    color: 'white',
                },
            });
        }
        // Reset form fields if needed
        // setUsername('');
        // setPassword('');
    };

    return (
        <>        <ToastContainer />
            <div className="login-container">
                <div className="image-container">
                    <img src={bg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="login-form-container">
                    <div className="form_main" style={{ height: '100vh' }}>
                        <img src={Logo} alt="" width={120} style={{ display: 'block', padding: '20px' }} />
                        <p className="heading">Login</p>
                        <div className="inputContainer">
                            <svg
                                className="inputIcon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#2e2e2e"
                                viewBox="0 0 16 16"
                            ></svg>
                            <input
                                type="email"
                                className="inputField"
                                id="username"
                                placeholder="admin123@admin.com"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="inputContainer">
                            <svg
                                className="inputIcon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#2e2e2e"
                                viewBox="0 0 16 16"
                            ></svg>
                            <input
                                type="password"
                                className="inputField"
                                id="password"
                                placeholder="admin123"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button onClick={handleLogin} id="button">
                            Login
                        </button>
                    </div>
                </div>
            </div>                   </>

    );
};

export default LoginAdmin;
