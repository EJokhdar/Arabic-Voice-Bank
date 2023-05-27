import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";
import Help from "./pages/Help";
import RecordingProgress from "./pages/RecordingProgress";
import Profile from "./pages/Profile";
import Recording from "./pages/Recording";
import RecordingLimit from "./pages/RecordingLimit";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/help" element={<Help />} />
          <Route path="/dashboard/" element={<User />}>
            <Route path="" element={<RecordingProgress />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="recording" element={<Recording />} />
          <Route path="limit" element={<RecordingLimit />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
