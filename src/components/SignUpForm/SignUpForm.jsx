import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./SignUpForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "../../utils/Provider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const nav = useNavigate();
  const inputRef = useRef();
  const { setLoggedInUser } = ContextProvider();
  const [passVisible, setPassVisible] = useState(false);

  async function signUpUser(e) {
    e.preventDefault();
    if (
      userPassword.trim() === "" ||
      userEmail.trim() === "" ||
      userPassword.trim() === ""
    ) {
      toast.error("Fill the empty fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      const res = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "b8cjykmftj1r",
          },
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword,
            appType: "music",
          }),
        }
      );
      const data = await res.json();

      if (data.status === "fail") {
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        return;
      }
      document.cookie = data.token;
      toast.success("Sign Up Successful!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      console.log(userName, userEmail, userPassword);
      setLoggedInUser({
        name: userName,
        status: true,
      });
      setTimeout(() => {
        nav("/");
      }, 1500);
    } catch (err) {
      toast.error("Something went Wrong !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function redirectLogin() {
    nav("/login");
  }

  function changeInputType() {
    if (passVisible) {
      inputRef.current.type = "password";
      setPassVisible(false);
    } else {
      inputRef.current.type = "text";
      setPassVisible(true);
    }
  }

  return (
    <div className="signUpFormContainer">
      <div className="signUpForm rounded-lg">
        <form className="signUpFormTop" onSubmit={signUpUser}>
          <h2>Sign In</h2>
          <div className="signUpUserNameForm">
            <label htmlFor="userName">Username</label>
            <input
              value={userName}
              autoFocus
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              className="signUpUserNameInput"
              style={{ marginBottom: 0 }}
              required
            />
          </div>
          <div className="userEmailForm">
            <label htmlFor="userName">Email</label>
            <input
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              type="text"
              className="signUpUserEmailInput"
              required
            />
          </div>
          <div className="userPasswordForm">
            <label htmlFor="password"> Password</label>
            <div className="loginInputDiv">
              <input
                ref={inputRef}
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                type="password"
                className="userPasswordInput"
                required
              />
              {(passVisible && (
                <VisibilityOffIcon
                  onClick={changeInputType}
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    position: "absolute",
                    right: 0,
                    paddingRight: "0.5rem",
                    fontSize: "2rem",
                  }}
                />
              )) || (
                <VisibilityIcon
                  onClick={changeInputType}
                  style={{
                    cursor: "pointer",
                    color: "gray",
                    position: "absolute",
                    right: 0,
                    paddingRight: "0.5rem",
                    fontSize: "2rem",
                  }}
                />
              )}
            </div>
          </div>
          <Button
            className="updatePasswordSubmit"
            style={{
              fontWeight: "bold",
              backgroundColor: "yellow",
              width: "100%",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            Sign Up
          </Button>
        </form>
        <div className="signUpFormBottom">
          <p>Already have a Account?</p>
          <Button
            className="updatePasswordSubmit"
            style={{
              fontWeight: "bold",
              backgroundColor: "lightseagreen",
              width: "100%",
              color: "white",
              marginTop: "1rem",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
            onClick={redirectLogin}
          >
            Login
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUpForm;
