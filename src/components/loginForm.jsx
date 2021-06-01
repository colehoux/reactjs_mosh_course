import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";

class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = async () => {
        //Call the server, save changes, redirect
        const { data } = this.state;

        try {
            const { data: jwt } = await authService.login(data.username, data.password);
            localStorage.setItem("token", jwt);
            //window.location() instead of this.props.history.push() to reload the entire app to triggercomponentDidMount() to display user via localStorage (see App.js )
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
