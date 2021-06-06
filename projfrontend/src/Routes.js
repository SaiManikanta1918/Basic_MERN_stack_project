import React from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashBoard";
import UserDashboard from "./user/UserDashBoard";
import Profile from "./user/Profile";
import PrivateRoute from  "./auth/helper/PrivateRoutes";
import AdminRoute from  "./auth/helper/AdminRoutes";
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';




const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />                
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/categories" exact component={ManageCategories} />                

            </Switch>
        </BrowserRouter>
    );
}


export default Routes;