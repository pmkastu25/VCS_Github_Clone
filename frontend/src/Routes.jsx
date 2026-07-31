import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Profile from './components/user/Profile.jsx';

import { useAuth } from './authContext';

export const ProjectRoutes = () => {
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdfromStorage = localStorage.getItem("userId");

        if(userIdfromStorage && !currentUser){
            setCurrentUser(userIdfromStorage);
        }

        if(!userIdfromStorage && !["/auth", "/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }

        if(userIdfromStorage && window.location.pathname == '/auth'){
            navigate("/");
        }

    }, [currentUser, navigate, setCurrentUser])

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard/>
        },
        {
            path: "/auth",
            element: <Login/>
        },
        {
            path: "/signup",
            element: <Signup/>
        },
        {
            path: "/profile",
            element: <Profile/>
        }
    ])

    return element;
}