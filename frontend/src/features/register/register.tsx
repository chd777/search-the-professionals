import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../../shared/config/api"; 
import type { AxiosResponse, AxiosError } from "axios";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    registerApi(formData)
      .then((res: AxiosResponse) => {
        toast.success("Registration successful!");
        navigate("/login");
      })
      .catch((err: AxiosError) => {
        const msg = err.response?.data as string ?? "Server error";
        toast.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label className="label-tag">
          Username:
          <input className="input-tag" onChange={handleChange} type="text" value={formData.username} name="username" required />
        </label>
        <br />
        <label className="label-tag">
          Email:
          <input className="input-tag" onChange={handleChange} type="email" value={formData.email} name="email" required />
        </label>
        <br />
        <label className="label-tag">
          Password:
          <input className="input-tag" onChange={handleChange} type="password" value={formData.password} name="password" required />
        </label>
        <br />
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="login-link">Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default Register;
