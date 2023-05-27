import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import "./pages.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../components/ui/ErrorMessage";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setPasswordConfirmation] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const submitRegister = async () => {
    const createUser = async (userData) => {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMessage = `Failed to create user: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const createdUser = await response.json();
      return createdUser;
    };

    const userData = {
      email: email,
      password: password,
      gender: gender,
    };

    return createUser(userData);
  };

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmationPassword && passwordRegex.test(password)) {
        await submitRegister();
        setErrorMessage("تم التسجيل");
        setSuccess(true);
        navigate("/login");
      } else if (!passwordRegex.test(password)) {
        setErrorMessage(
          "الرقم السري ضعيف، يجب ان يحتوي على حرف كبير وحرف صغير ورقم ورمز خاص"
        );
        setSuccess(false);
      } else if (password !== confirmationPassword) {
        setErrorMessage("الارقام السرية غير متطابقة");
        setSuccess(false);
      } else {
        setErrorMessage(
          "الارقام السرية غير متطابقة، و يجب ان تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص"
        );
        setSuccess(false);
      }
    } catch (error) {
      setErrorMessage("البريد الإلكتروني مستعمل");
      setSuccess(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upper-layer">
        <div className="Signup">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmationPassword}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errorMessage && (
              <p
                style={{
                  color: success ? "blue" : "red",
                  maxWidth: "191px",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </p>
            )}
            <button className="registerBtn" type="submit">
              سجل الأان
            </button>
          </form>
          <p className="redirect">
            {" "}
            هل لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>{" "}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SignUp;
