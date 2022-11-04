import React, { useEffect, useRef, useState } from "react";
import Button from "../Controls/Button/Button";
import Input from "../Controls/Input/Input";
import { login, reset } from "../../Features/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/Spinner";

const USERNAME_REGEX = /^[A-z][A-z0-9_]{4,15}$/;

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^[a-zA-Z0-9!@#$&()-`.+,*"]{5,15}$/;

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setErrMsg("");
  }, [id, password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(id.includes("@"), "  mcc");
    const v1 = id.includes("@")
      ? EMAIL_REGEX.test(id)
      : USERNAME_REGEX.test(id);
    const v2 = PWD_REGEX.test(password);
    console.log(v1, v2);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    console.log(id, password);

    const response = await dispatch(login({ id, password }));

    if (response.payload.status) {
      navigate("/");
    } else {
      setErrMsg(response.payload.message);
      console.log(response.payload.message, "   mshhh");
    }
  };
  return (
    <div className="form-container login">
      {isLoading && <LoadingSpinner />}

      <h2>Login</h2>
      <div>
        <form onSubmit={onSubmit} action="">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          {/* <div className="login-details"> */}

          <Input
            type="text"
            placeholder="Email or Username"
            name="id"
            handlechange={(e) => {
              setId(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            handlechange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button class="primaryLarge">Log In</Button>
          {/* </div> */}
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ paddingBottom: "5px" }}>Not yet registered?</p>
        <Button class="primarySmall" onclick={() => navigate("/register")}>
          {" "}
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
