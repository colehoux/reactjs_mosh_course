import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

class App extends Component {
    state = {};

    componentDidMount() {
        const jwt = localStorage.getItem("token");
        try {
            const user = jwtDecode(jwt);
            this.setState({ user });
        } catch (ex) {}
    }
    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar user={this.state.user} />
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/movies/:id" component={MovieForm} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
