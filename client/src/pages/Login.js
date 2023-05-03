import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    // console.log(values)
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/users/login`,
        values
      );
      console.log(response.data);
      localStorage.setItem(
        "expence tracker user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login Successfull");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("expence tracker user")) {
      navigate("/");
    }
  });
  return (
    <div className="login">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Let's get in</h1>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Don,t have an account?Click here to Register
              </Link>
              <button className="loginButton" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>

        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
