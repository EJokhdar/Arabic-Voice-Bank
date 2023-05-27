import { useState, useEffect } from "react";
import ziryab from "../assets/z-ryab2_orig.jpg";
import personalPassage from "../assets/personalPassage.png";

function RecordingProgress() {
  const [currentPromptId, setCurrentPromptId] = useState(0);
  const [user_id, setUserID] = useState("");
  const [progress, setProgress] = useState(0);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
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

        const progressResponse = await fetch(
          `http://localhost:8000/recording/progress?user_id=${userData.user_id}`
        );
        const progressData = await progressResponse.json();

        // Set the current prompt ID to the maximum prompt ID recorded by the user
        setCurrentPromptId(progressData);
        setProgress(Math.round((progressData / 18) * 100));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <>
      <div className="status">
        <h1>تسجيلاتك</h1>
      </div>
      <div className="cards">
        <div className="card">
          <h2 className="percentage">{progress}%</h2>
          <div className="card-info">
            <h2 className="passageTitle">نص زرياب</h2>
            <div
              className="progress"
              style={{ position: "relative", height: "20px" }}
            >
              <div
                className="progress-completed"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: `${100 - progress}%`,
                  backgroundColor: "rgb(180, 178, 178)",
                }}
              ></div>
            </div>
          </div>
          <img src={ziryab} alt="" className="passageImg" />
        </div>
      </div>
      <div className="cards">
        <div className="card">
          <h2 className="percentage">0%</h2>
          <div className="card-info">
            <h2 className="passageTitle">تسجيلاتك الخاصة</h2>
            <div className="progress"></div>
          </div>
          <img src={personalPassage} alt="" className="passageImg" />
        </div>
      </div>
    </>
  );
}

export default RecordingProgress;
