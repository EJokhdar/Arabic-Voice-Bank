import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecordButton from "../components/ui/RecordButton";
import PlaybackButton from "../components/ui/PlaybackButton";
import Prompt from "../components/ui/Prompt";

const AudioRecorder = () => {
  const navigate = useNavigate();
  const [user_id, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [currentPromptId, setCurrentPromptId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const accessToken = localStorage.getItem("access_token");

  const audioRef = useRef(null);

  if (currentPromptId === 19) {
    navigate("/limit");
  }

  function handleNextPrompt() {
    /* 18 is only for out passages change logic when adding new prompts*/
    if (currentPromptId === 18) {
      setCurrentPromptId(18);
    } else {
      window.alert("تم التسجيل بنجاح!");
      setCurrentPromptId(currentPromptId + 1);
    }
  }

  function handlePreviousPrompt() {
    if (currentPromptId === 1) {
      setCurrentPromptId(1);
    } else {
      setCurrentPromptId(currentPromptId - 1);
    }
  }

  const startRecording = () => {
    setMediaRecorder(mediaRecorder);

    setIsRecording(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        const chunks = [];

        mediaRecorder.start();

        mediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          setIsRecording(false);

          const blob = new Blob(chunks, { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
        });
      })
      .catch((error) => console.error(error));
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const handlePlayback = () => {
    if (!isPlaying && audioBlobUrl) {
      setIsPlaying(true);
      audioRef.current.play();
    } else if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset playback to start of audio
    }
  };

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
        setEmail(userData.email);
        setUserID(userData.user_id);

        const progressResponse = await fetch(
          `http://localhost:8000/recording/progress?user_id=${userData.user_id}`
        );
        const progressData = await progressResponse.json();

        // Set the current prompt ID to the maximum prompt ID recorded by the user
        setCurrentPromptId(progressData + 1);
        setProgress(Math.round((progressData / 18) * 100));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [accessToken, progress]);

  const uploadAudioFile = async () => {
    try {
      const formData = new FormData();
      const file = new File(
        [await fetch(audioBlobUrl).then((r) => r.blob())],
        email + "_" + currentPromptId + ".wav",
        {
          type: "audio/wav",
        }
      );
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/uploadfile/", {
        method: "POST",
        body: formData,
      });

      const recording_db_data = {
        user_id: parseInt(user_id),
        prompt_id: currentPromptId,
        file_path:
          "https://arabicvoicebank.s3.amazonaws.com/" +
          email +
          "_" +
          currentPromptId +
          ".wav",
      };

      const response_recording_db = await fetch(
        "http://localhost:8000/recording",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recording_db_data),
        }
      );

      const data = await response.json();
      const data2 = await response_recording_db.json();
      console.log(data); // Do something with the response data
      console.log(data2);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="back-btn">
        <Link to="/dashboard/" className="dashboard-links">
          <h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 -7.5 16 20"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            حفظ
          </h2>
        </Link>
      </div>
      <div>
        <div className="message-container">
          <Prompt id={currentPromptId} />
        </div>
        <div className="keyboard">
          <button onClick={handlePreviousPrompt} className="key">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-caret-right-fill"
              viewBox="0 -6 16 20"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>{" "}
            السابق{" "}
          </button>
          {isRecording ? (
            <RecordButton
              isRecording={isRecording}
              onClick={stopRecording}
              className="key"
            />
          ) : (
            <RecordButton
              isRecording={isRecording}
              onClick={startRecording}
              className="key"
            />
          )}
          {
            <PlaybackButton
              audioBlobUrl={audioBlobUrl}
              onClick={handlePlayback}
              className="key"
              disabled={isPlaying}
            />
          }
          <button
            onClick={() => {
              audioBlobUrl && uploadAudioFile(audioBlobUrl);
              audioBlobUrl && handleNextPrompt();
              setAudioBlobUrl(null);
            }}
            className="key"
          >
            التالي
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-caret-left-fill"
              viewBox="0 -6 16 20"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </button>
        </div>
        <div
          className="progress-recording-page"
          style={{ position: "relative", height: "20px", width: "400px" }}
        >
          <div
            className="progress-completed-recording-page"
            style={{
              position: "absolute",
              height: "100%",
              width: `${100 - (currentPromptId / 18) * 100}%`,
              backgroundColor: "rgb(180, 178, 178)",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
export default AudioRecorder;
