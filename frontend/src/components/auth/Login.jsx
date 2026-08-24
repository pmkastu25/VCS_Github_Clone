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
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);
    })

     const {currentUser,setCurrentUser} = useAuth();

    const handleLogin = async(e) =>{
        try{
          setLoading(true);

          const res = await axios.post("https://localhost:3002/auth", {
            email: email,
            password: password
          })

          localStorage.setItem("token", res.data.token);

          localStorage.setItem("userID", res.data.userId);

          currentUser = res.data.userId;
          setCurrentUser(currentUser);
          setLoading(false);

          window.location.href = '/';
        } catch(err) {
          setLoading(false);
          alert("Login Failed!");
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
                <PageHeader.Title>Sign In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          {/* </Box> */}
        </div>

        <div className="login-box">
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
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            Don't have a account? <Link  to="/signup">Sign Up</Link>
          </p>
        </div>
        </div>
      </div>
  );
};

export default Signup;