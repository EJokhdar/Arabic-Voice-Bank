import { useState, useEffect } from "react";
import FormInput from "../components/form/FormInput";

function Profile() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // get the access token from local storage
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/me", {
          headers: {
            token: accessToken,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          console.error(data);
          throw new Error(data.detail);
        }

        const data = await response.json();
        setEmail(data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        newPassword: newPassword,
        currentPassword: currentPassword,
      };

      // check if the new password is the same as the current password
      if (data.newPassword === data.currentPassword) {
        throw new Error(
          "لا يمكن أن تكون كلمة المرور الجديدة هي نفسها كلمة المرور الحالية"
        );
      }

      if (!validatePassword(data.newPassword)) {
        setError(
          "يجب أن تحتوي كلمة المرور الجديدة على حرف كبير واحد ورقم واحد وحرف خاص واحد على الأقل"
        );
        setSuccess(false);
        return;
      }

      // make a PUT request to the /users/me/password endpoint with the updated password values
      const response = await fetch(
        `http://127.0.0.1:8000/users/me/password?new_password=${data.newPassword}&current_password=${data.currentPassword}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: accessToken,
          },
        }
      );

      // check if the response was successful
      if (!response.ok) {
        const data = await response.json();
        console.error(data);
        throw new Error(data.detail);
      }

      // set the success state if the password was updated successfully
      setSuccess(true);
      setError(null);
    } catch (error) {
      // set the error state if there was an error
      console.error(error);
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>{email}</h2>
        <input
          type="password"
          placeholder="Current Password"
          className="formInput"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="formInput"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />

        <button className="registerBtn">تغيير كلمة المرور</button>
        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </div>
        )}
        {success && (
          <div
            style={{ color: "green", textAlign: "center", marginTop: "10px" }}
          >
            تم تحديث كلمة السر بنجاح
          </div>
        )}
      </form>
    </>
  );
}

export default Profile;
