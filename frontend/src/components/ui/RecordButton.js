import React from "react";

const RecordButton = ({ isRecording, onClick }) => {
  return (
    <button onClick={onClick} className="recordingButton">
      {isRecording ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-stop-fill"
            viewBox="0 -6 16 20"
          >
            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
          </svg>
          <span>أقف تسجيل</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-record-fill"
            viewBox="0 -6 16 20"
          >
            <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
          </svg>{" "}
          <span>أبدأ تسجيل</span>
        </>
      )}
    </button>
  );
};

export default RecordButton;
