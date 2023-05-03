import React from "react";
import "../assets/Layout.css";
import { Button, Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";

function Layout(props) {
  const user = JSON.parse(localStorage.getItem("expence tracker user"));
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <li
              onClick={() => {
                localStorage.removeItem("expence tracker user");
                navigate("/login");
              }}
            >
              Logout
            </li>
          ),
        },
        // {
        //     key: '2',
        //     label: (
        //         <a target="_blank" rel="noopener noreferrer" href="/profile">
        //             Profile
        //         </a>
        //     ),
        // },
      ]}
    />
  );

  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Expence Tracker</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className="secondery">{user.name}</button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default Layout;
