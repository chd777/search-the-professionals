import { useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from '../../shared/config/api';
import type { AxiosResponse, AxiosError } from 'axios';
import './login.css';
import { toast } from 'react-toastify';


function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (loading) {
          return;
        }

        setLoading(true);
        login(formData).then((res: AxiosResponse) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          navigate("/home");
        })
        .catch(
          (error: AxiosError) => {
            const message = error.response?.data as String ?? "Server error";
            toast.error(message);
          })
        .finally(() => {
            setLoading(false);
        });
    }
  return (
    <div className="login-container">
      <h1>Login Page</h1>
        <form onSubmit= {handleSubmit} action = "" className="login-form">
            <label className="label-tag">
            Username:
            <input className="input-tag" onChange={handleChange} type="text" value = {formData.username} name="username" />
            </label>
            <br />
            <label className="label-tag">
            Password:
            <input className="input-tag" onChange={handleChange} type="password" value = {formData.password} name="password" />
            </label>
            <br />
            <button className="submit-button" type="submit">Login</button>
        </form>
        <p className="register-link">Don't have an account? <a href="/register">Register here</a></p>
    </div>
  )};

export default Login;