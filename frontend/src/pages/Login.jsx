import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../components/ui/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const response = await fetch("http://127.0.0.1:8000/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData.access_token);

    if (response.ok) {
      // Save access token to localStorage
      localStorage.setItem("access_token", responseData.access_token);
      // Redirect to dashboard
      navigate("/dashboard/");
    } else {
      // Display error message
      setErrorMessage("الرقم السري او البريد الإلكتروني غير صحيح");
    }
  };

  return (
    <>
      <Navbar />
      <div className="upper-layer">
        <div className="Signup">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="signInBtn">تسجيل الدخول</button>
            <ErrorMessage message={errorMessage} />
          </form>
          <p className="redirect">
            ليس لديك حساب؟ <Link to="/signup">سجل هنا</Link>{" "}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
