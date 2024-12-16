// SignIn.js
import React, { useContext, useState } from "react";
import "./SignIn.css";
import { fetchData } from "../../api/FetchData";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Logo from "../../img/Logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const { reloadUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation: Ensure email and password are not empty
    if (!email || !password) {
      toast.warning("Both fields are required!");
      return;
    }

    // Validation: Ensure email is in the correct format
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchData("User/login", "POST", {
        email,
        password,
      });

      if (response.user) {
        // Handle successful login
        toast.success("Login Success:", response.user);
        setLoading(false);
        await reloadUser(); // Reload the user after successful login
        navigate("/Admin");
      } else {
        toast.error(response.message || "Login Failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container-fluid-signin">
      <div className="d-flex justify-content-center">
        <img src={Logo} alt="" className="logologin" />
      </div>
      <div className="loginHolder">
        <p className="text-white text-center h6">
          login using the credentials provided in the email.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__group field mb-4">
              <input
                type="password"
                className="form__field"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? <div className="lds-dual-ring1"></div> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
