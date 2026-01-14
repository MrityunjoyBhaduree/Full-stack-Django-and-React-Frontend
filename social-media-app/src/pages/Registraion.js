import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/authentication/RegistrationForm";


function Registration() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="content text-center px-4">
                        <h1>
                            Welcome to Postly!
                        </h1>
                        <p className="content">
                            This is a new social media site that will
                            allow you to share your thoughts and
                            experiences with your friends. Register now
                            and start enjoying! <br />
                            or if you  already have an account, please{""}
                            <Link to="/users/login/">Login</Link>
                        </p>
                    </div>
                </div>
                <div className="col-md-6 p-5">
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}


export default Registration;

