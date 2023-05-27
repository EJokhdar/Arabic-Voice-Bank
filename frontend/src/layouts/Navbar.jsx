import "../assets/global.css";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Navbar() {
  useEffect(() => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelectorAll("header ul");

    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
      });
    });
  }, []);

  return (
    <header>
      <ul>
        <li>
          <Link to="/signup" className="signup-link">
            إنشاء حساب جديد
          </Link>
        </li>
        <li>
          <Link to="/login">تسجيل الدخول</Link>
        </li>
        <li>
          <Link to="/">الصفحة الرئيسية</Link>
        </li>
      </ul>
      <Link to="/" className="logo">
        بنك الأصوات العربي
      </Link>
      <div class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Navbar;
