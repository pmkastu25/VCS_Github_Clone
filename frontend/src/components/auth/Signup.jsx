import React from 'react';
import axios from 'axios';

import {PageHeader} from "@primer/react";
import {Button} from "@primer/react";
import '../auth/auth.css';

function Signup() {
    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img src="" />
                <div className='box'>
                <PageHeader>
                    <PageHeader.TitleArea>
                        <PageHeader.Title>Sign Up</PageHeader.Title>
                    </PageHeader.TitleArea>
                </PageHeader>
                </div>
            </div>

            <div className="login-box">
                <div className="login-username">
                     <label for="Username">Username: </label>
                     <input type="text"
                     name="Username"
                     id="Username"
                     autoComplete='off'
                     required/>
                </div>
                <div className="login-email">
                    <label for="Email">Email: </label>
                    <input type="email"
                     name="Email"
                     id="Email"
                     autoComplete='off'
                     required/>
                </div>
                <div className="login-password">
                    <label for="Password">Password: </label>
                    <input type="password"
                    name="Password"
                    id="Password"
                    autoComplete='off'
                    required/>
                </div>

                <div className='sign-up-btn'>
                <Button>
                    Sign Up
                </Button>
            </div>

            <div>
                <p>
                    Already a customer? <a href="/login">Login</a>
                </p>
            </div>
            </div>
        </div>
    );
}

export default Signup;