import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecordingLimit = () => {
  const navigate = useNavigate();
  const [user_id, setUserID] = useState("");
  const accessToken = localStorage.getItem("access_token");

  function handleRedirect() {
    navigate("/dashboard");
  }

  const fetchData = async () => {
    try {
      const userResponse = await fetch("http://localhost:8000/users/me", {
        headers: {
          token: accessToken,
        },
      });

      if (!userResponse.ok) {
        const data = await userResponse.json();
        console.error(data);
        throw new Error(data.detail);
      }

      const userData = await userResponse.json();
      setUserID(userData.user_id);

      fetch(`http://localhost:8000/recordings/${userData.user_id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Print a success message to the console
          navigate("/dashboard");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="recording-layer">
        <h1>!تم تسجيل جميع المقاطع</h1>
        <h1>هل تريد إعادة تسجيل المقاطع مرة أخرى؟</h1>
        <div className="keyboard">
          <button className="key" onClick={fetchData}>
            نعم&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check-lg"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
            </svg>
          </button>
          <button className="key" onClick={handleRedirect}>
            &nbsp;&nbsp;لا&nbsp;&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
export default RecordingLimit;
