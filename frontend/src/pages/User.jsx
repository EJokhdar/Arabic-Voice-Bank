import { Link, Outlet } from "react-router-dom";
import profile from "../assets/profile.png";
import dashboard from "../assets/dashboard.png";
import signout from "../assets/signout.png";
import microphone from "../assets/microphone.png";
function User() {
  return (
    <>
      <main>
        <div className="container">
          <div className="dashboardPage">
            <Outlet />
          </div>
          <div className="dashboard">
            <div className="links">
              <Link to="/dashboard" className="dashboard-links">
                <div className="link">
                  <img src={dashboard} alt="" className="profileImg" />
                  <h2>الرئيسية</h2>
                </div>
              </Link>
              <Link to="/dashboard/profile" className="dashboard-links">
                <div className="link">
                  <img src={profile} alt="" className="profileImg" />
                  <h2>حسابك</h2>
                </div>
              </Link>
              <Link to="/" className="dashboard-links">
                <div className="link">
                  <img src={signout} alt="" className="profileImg" />
                  <h2>خروج</h2>
                </div>
              </Link>
            </div>
            <Link to="/recording" className="dashboard-links">
              <div className="record">
                <img src={microphone} alt="" className="microphoneImg" />
                <h2>أبدأ التسجيل</h2>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default User;
