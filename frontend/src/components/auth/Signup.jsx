import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import {Link} from "@primer/react";

import logo from "../../assets/github-mark-white.svg";

import { PageHeader } from "@primer/react";
import { Button } from "@primer/react";
import "./auth.css";

function Signup() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async(e) =>{
        try{
          setLoading(true);

          const res = await axios.post("https://localhost:3000/signup", {
            email: email,
            username: username,
            password: password
          })

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("userID", res.data.userId);

          setLoading(false);

          window.location.href = '/';
        } catch(err) {
          setLoading(false);
          alert("SignUp Failed!");
          console.error(err);
        }
    }

    return (
        <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          {/* <Box sx={{ padding: 1 }}> */}
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign Up</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          {/* </Box> */}
        </div>

        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account? <Link  to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;