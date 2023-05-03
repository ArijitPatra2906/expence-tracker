import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    // console.log(values);
    // const config = {
    //     headers: {
    //         "Content-type": "application/json",
    //     },
    // };
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/users/register`,
        values
      );
      // console.log(response.config?.data)
      // localStorage.setItem("expence tracker user", JSON.stringify({response.config?.data, password: "" }))
      setLoading(false);
      message.success("Registration Successfull");

      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  // useEffect(() => {
  //     if (localStorage.getItem("expence tracker user")) {
  //         navigate("/")
  //     }
  // })
  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
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
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Create an account</h1>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">
                Already have an account?Click here to Login
              </Link>
              <button className="loginButton" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
