import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AxiosError } from "axios";
// import { register as apiRegister } from "../../shared/config/api"; // COMMENTED OUT TO TEST
import { toast } from "react-toastify";
import "./register.css";

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

function Register() {
  console.log("Register component is rendering!"); // CHECK CONSOLE FOR THIS
  
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<IRegisterForm>({
    username: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TESTING - Temporarily disable API call
      console.log("Form data:", formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // await apiRegister(formData); // COMMENTED OUT FOR TESTING
      
      toast.success("Registration successful! Please login.");
      
      // Reset form
      setFormData({ username: '', email: '', password: '' });
      setErrors({});
      
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError;
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Registration failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Register Page - TEST</h1>

      <form
        onSubmit={handleSubmit}
        className="register-form"
        noValidate
        aria-live="polite"
      >
        <div className="form-field">
          <label className="label-tag" htmlFor="username">
            Username:
          </label>
          <input
            id="username"
            name="username"
            className="input-tag"
            type="text"
            value={formData.username}
            onChange={handleChange}
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <div id="username-error" className="error-text" role="status">
              {errors.username}
            </div>
          )}
        </div>

        <div className="form-field">
          <label className="label-tag" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            name="email"
            className="input-tag"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div id="email-error" className="error-text" role="status">
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-field">
          <label className="label-tag" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            name="password"
            className="input-tag"
            type="password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <div id="password-error" className="error-text" role="status">
              {errors.password}
            </div>
          )}
        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;