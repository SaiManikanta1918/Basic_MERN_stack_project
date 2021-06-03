import React from 'react';
import { Link, withRouter } from "react-router-dom";

const currentTab = (history,path) => {
    if(history.location.pathname === path)
        return { color : "#2ecc72" };
    else
        return { color : "#FFFFFF" };
}
const Menu = ({ history }) => (
    <div>
        <ul className = "nav nav-tabs ">
            <li className = "nav-item p-3">
                <Link style ={ currentTab(history, "/") } className = "nav-link" to = "/">
                    Home
                </Link>
            </li>
            <li className = "nav-item p-3">
                <Link  style ={ currentTab(history, "/cart") } className = "nav-link" to = "/cart">
                    Cart
                </Link>
            </li>
            <li className = "nav-item p-3">
                <Link style ={ currentTab(history, "/user/dashboard") } className = "nav-link" to = "/user/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className = "nav-item p-3">
                <Link style ={ currentTab(history, "/Admin/dashboard") } className = "nav-link" to = "/Admin/dashboard">
                    A. Dashboard
                </Link>
            </li>
            <li className = "nav-item p-3">
                <Link style ={ currentTab(history, "/signup") } className = "nav-link" to = "/signup">
                    SignUp
                </Link>
            </li>
            <li className = "nav-item p-3">
                <Link style ={ currentTab(history, "/signin") } className = "nav-link" to = "/signin">
                    Sign In
                </Link>
            </li>
            <li className = "nav-item p-3">
                <Link style ={ currentTab(history, "/signout") } className = "nav-link" to = "/signout">
                    Sign Out
                </Link>
            </li>
        </ul>
    </div>
);


export default withRouter(Menu);